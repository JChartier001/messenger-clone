import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Payment } from '@prisma/client';

import { stripe } from '@/app/libs/stripe';
import prismadb from '@/app/libs/prismadb';

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get('Stripe-Signature') as string;
	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error: any) {
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const address = session?.customer_details?.address;

	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country,
	];

	const addressString = addressComponents.filter(c => c !== null).join(', ');

	if (event.type === 'checkout.session.completed') {
		let payment: Payment | null = null;
		const paymentId = session.payment_intent!.toString();
		if (paymentId !== null) {
			payment = await prismadb.payment.create({
				data: {
					referenceId: session?.metadata?.reference_id,
					amount: session.amount_total!,
					paymentId: paymentId,
					status: session.status!,
				},
			});
		}

		const orders = await prismadb.order.findMany({
			where: {
				referenceId: session?.metadata?.reference_id,
			},
		});

		orders.map(async order => {
			const returnedOrder = await prismadb.order.update({
				where: {
					id: order.id,
				},
				data: {
					isPaid: true,
					address: addressString,
					phone: session?.customer_details?.phone || '',
					paymentId: payment?.id,
				},
				include: {
					orderItems: true,
				},
			});
			returnedOrder.orderItems.map(async orderItem => {
				const product = await prismadb.product.findUnique({
					where: {
						id: orderItem.productId,
					},
				});
				await prismadb.product.update({
					where: {
						id: product!.id,
					},
					data: {
						stockQuantity: product!.stockQuantity - orderItem.quantity,
						isArchived: product!.stockQuantity - orderItem.quantity === 0,
					},
				});
			});
		});
	}

	return new NextResponse(null, { status: 200 });
}
