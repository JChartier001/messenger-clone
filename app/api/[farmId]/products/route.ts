import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prismadb from '@/app/libs/prismadb';

export async function POST(
	req: Request,
	{ params }: { params: { farmId: string } }
) {
	try {
	const currentUser = await getCurrentUser();
		const body = await req.json();
		

		const { name, price, categoryId, labelId, images } = body;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
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

		if (!params.farmId) {
			return new NextResponse('farm id is required', { status: 400 });
		}

		const farmByUserId = await prismadb.farm.findFirst({
			where: {
				id: params.farmId,
				userId: currentUser.id,
			},
		});
		const label = await prismadb.unitLabel.findFirst({
			where: {
				id: labelId,
			},
		});
		const category = await prismadb.category.findFirst({
			where: {
				id: categoryId,
			},
		});

		if (!farmByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const product = await prismadb.product.create({
			data: {
				...body,
				slug: `${name.toLowerCase().replace(' ', '-')}-${label?.name
					.toLowerCase()
					.replace(' ', '-')}-${category?.slug}-${farmByUserId.name
					.toLowerCase()
					.replace(' ', '-')}-${farmByUserId.city
					.toLowerCase()
					.replace(' ', '-')}-${farmByUserId.state
					.toLowerCase()
					.replace(' ', '-')}-${farmByUserId.zip
					.toLowerCase()
					.replace(' ', '-')}`,
				farmId: params.farmId,
				images: {
					create: images.map((image: { url: string }) => ({
						url: image.url,
					})),
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('[PRODUCTS_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { farmId: string } }
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get('categoryId') || undefined;
		const labelId = searchParams.get('labelId') || undefined;
		const isFeatured = searchParams.get('isFeatured');

		if (!params.farmId) {
			return new NextResponse('farm id is required', { status: 400 });
		}

		const products = await prismadb.product.findMany({
			where: {
				farmId: params.farmId,
				categoryId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				label: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.error('[PRODUCTS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
