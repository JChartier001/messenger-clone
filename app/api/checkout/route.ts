import Stripe from 'stripe';
import { NextResponse } from 'next/server';
const { v4: uuidv4 } = require('uuid');

import { stripe } from '@/app/libs/stripe';
import prismadb from '@/app/libs/prismadb';


const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}

interface Item {
	id: string;
	name: string;
	price: number;
	images: string;
	quantity: number;
}

interface FarmOrder {
	farmId: string;
	items: Item[];
	referenceId?: string;
}

export async function POST(req: Request) {
	const { productIds } = await req.json();
	const reference_id = uuidv4();

	if (!productIds || productIds.length === 0) {
		return new NextResponse('Product ids are required', { status: 400 });
	}

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	productIds.forEach((order: FarmOrder) => {
		order.items.forEach(product => {
			line_items.push({
				price_data: {
					currency: 'usd',
					product_data: {
						name: product.name,
						images: [product.images],
					},
					unit_amount: product.price * 100,
				},
				quantity: product.quantity,
			});
		});
	});

	productIds.map(async (order: FarmOrder) => {
		await prismadb.order.create({
			data: {
				farmId: order.farmId,
				isPaid: false,
				customerId: productIds[0].customerId,
				referenceId: reference_id,
				paymentId: '',
				orderItems: {
					create: order.items.map((item: Item) => ({
						product: {
							connect: {
								id: item.id,
							},
						},
						quantity: item.quantity,
					})),
				},
			},
		});
	});

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		billing_address_collection: 'required',
		phone_number_collection: {
			enabled: true,
		},
		success_url: `${process.env.NEXT_FRONT_END_URL}/cart?success=1`,
		cancel_url: `${process.env.NEXT_FRONT_END_URL}/cart?canceled=1`,
		metadata: {
			reference_id: reference_id,
		},
	});
	return NextResponse.json({ url: session.url });
}
