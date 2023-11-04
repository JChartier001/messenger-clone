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

		const { name, value } = body;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
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

		if (!farmByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const size = await prismadb.unitLabel.create({
			data: {
				name,
				value,
				farmId: params.farmId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.error('[SIZES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { farmId: string } }
) {
	try {
		if (!params.farmId) {
			return new NextResponse('Farm id is required', { status: 400 });
		}

		const sizes = await prismadb.unitLabel.findMany({
			where: {
				farmId: params.farmId,
			},
		});

		return NextResponse.json(sizes);
	} catch (error) {
		console.error('[SIZES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
