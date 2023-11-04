import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prismadb from '@/app/libs/prismadb';

export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		const category = await prismadb.category.findUnique({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error('[CATEGORY_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
	const currentUser = await getCurrentUser();

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		const category = await prismadb.category.delete({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error('[CATEGORY_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { categoryId: string; farmId: string } }
) {
	try {
		const currentUser = await getCurrentUser();
		
		if (!currentUser?.id || !currentUser?.email || currentUser?.role !== 'ADMIN') {return new NextResponse('Unauthorized', { status: 401 }); }

		const body = await req.json();

		const { name } = body;

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		const category = await prismadb.category.update({
			where: {
				id: params.categoryId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error('[CATEGORY_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
