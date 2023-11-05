import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

import prismadb from "@/app/libs/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { farmId: string } },
) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { typeId, imageUrl, description } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!typeId) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.farmId) {
      return new NextResponse("farm id is required", { status: 400 });
    }

    const farmByUserId = await prismadb.farm.findFirst({
      where: {
        id: params.farmId,
        userId: currentUser.id,
      },
    });

    if (!farmByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prismadb.certification.create({
      data: {
        typeId,
        imageUrl,
        description,
        approved: false,
        farmId: params.farmId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[CERTIFICATIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { farmId: string } },
) {
  try {
    if (!params.farmId) {
      return new NextResponse("farm id is required", { status: 400 });
    }

    const billboards = await prismadb.certification.findMany({
      where: {
        farmId: params.farmId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.error("[CERTIFICATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
