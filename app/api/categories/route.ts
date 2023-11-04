import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prismadb from '@/app/libs/prismadb';

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();

		const body = await req.json();

		const { name } = body;

		if (!currentUser?.id || !currentUser?.email || currentUser?.role !== 'ADMIN') {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		const category = await prismadb.category.create({
			data: {
				name,
				slug: name.toLowerCase().replace(' ', '-'),
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error('[CATEGORIES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const categories = await prismadb.category.findMany();
		return NextResponse.json(categories);
	} catch (error) {
		console.error('[CATEGORIES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
