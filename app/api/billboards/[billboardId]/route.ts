import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prismadb from '@/app/libs/prismadb';

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		if (!params.billboardId) {
			return new NextResponse('Billboard id is required', { status: 400 });
		}

		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.error('[BILLBOARD_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } }
) {
	try {
		const currentUser = await getCurrentUser();

		//add authorization

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.billboardId) {
			return new NextResponse('Billboard id is required', { status: 400 });
		}

		const billboard = await prismadb.billboard.delete({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.error('[BILLBOARD_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		const currentUser = await getCurrentUser();

		const body = await req.json();

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.billboardId) {
			return new NextResponse('Billboard id is required', { status: 400 });
		}

		const billboard = await prismadb.billboard.update({
			where: {
				id: params.billboardId,
			},
			data: {
				...body,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.error('[BILLBOARD_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
