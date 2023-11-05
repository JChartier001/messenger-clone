import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

import prismadb from "@/app/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { certificationId: string } },
) {
  try {
    if (!params.certificationId) {
      return new NextResponse("Certification id is required", { status: 400 });
    }

    const billboard = await prismadb.certification.findUnique({
      where: {
        id: params.certificationId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { certificationId: string; farmId: string } },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.certificationId) {
      return new NextResponse("Certification id is required", { status: 400 });
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

    const billboard = await prismadb.certification.delete({
      where: {
        id: params.certificationId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[CERTIFICATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { certificationId: string; farmId: string } },
) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!params.certificationId) {
      return new NextResponse("Certification id is required", { status: 400 });
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

    const billboard = await prismadb.certification.update({
      where: {
        id: params.certificationId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[CERTIFICATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
