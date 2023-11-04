import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prismadb from '@/app/libs/prismadb';

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		const product = await prismadb.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				label: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('[PRODUCT_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { productId: string; farmId: string } }
) {
	try {
	const currentUser = await getCurrentUser();

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		const farmByUserId = await prismadb.farm.findFirst({
			where: {
				id: params.farmId,
				userId: currentUser.id,
			},
		});

		if (!farmByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const product = await prismadb.product.delete({
			where: {
				id: params.productId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { productId: string; farmId: string } }
) {
	try {
	const currentUser = await getCurrentUser();

		const body = await req.json();

		const {
			name,
			price,
			categoryId,
			images,

			labelId,
		} = body;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!price) {
			return new NextResponse('Price is required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		if (!labelId) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		const farmByUserId = await prismadb.farm.findFirst({
			where: {
				id: params.farmId,
				userId: currentUser.id,
			},
		});

		if (!farmByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				...body,
				images: {
					deleteMany: {},
				},
			},
		});

		const product = await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				images: {
					create: [...images.map((image: { url: string }) => image)],
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
