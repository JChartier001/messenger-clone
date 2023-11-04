import { NextResponse } from 'next/server';

import prismadb from '@/app/libs/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { labelId: string } }
) {
	try {
		if (!params.labelId) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		const size = await prismadb.unitLabel.findUnique({
			where: {
				id: params.labelId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.error('[SIZE_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { labelId: string; farmId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.labelId) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		const farmByUserId = await prismadb.farm.findFirst({
			where: {
				id: params.farmId,
				userId,
			},
		});

		if (!farmByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const size = await prismadb.unitLabel.delete({
			where: {
				id: params.labelId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.error('[SIZE_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { labelId: string; farmId: string } }
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { name, value } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
		}

		if (!params.labelId) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		const farmByUserId = await prismadb.farm.findFirst({
			where: {
				id: params.farmId,
				userId,
			},
		});

		if (!farmByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const size = await prismadb.unitLabel.update({
			where: {
				id: params.labelId,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.error('[SIZE_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
