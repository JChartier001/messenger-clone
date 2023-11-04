import { NextResponse, NextRequest } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function GET(req: NextRequest) {
	try {
		const customerId = req.nextUrl.searchParams.get('customerId');

		if (!customerId) {
			return new NextResponse('Customer id is required', { status: 400 });
		}
		const orders = await prismadb.order.findMany({
			where: {
				customerId: customerId,
			},
			include: {
				orderItems: {
					include: {
						product: {
							include: {
								images: true,
							},
						},
					},
				},
				farm: true,
				payment: true,
			},
		});

		return NextResponse.json(orders);
	} catch (err) {
		console.error('[ORDER_GET_BY_CUSTOMER_ID]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}
