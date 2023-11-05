import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { farmId: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.farmId) {
      return new NextResponse("Farm id is required", { status: 400 });
    }

    const farm = await prismadb.farm.updateMany({
      where: {
        id: params.farmId,
        userId: currentUser.id,
      },
      data: body,
    });

    return NextResponse.json(farm);
  } catch (error) {
    console.error("[FARM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { farmId: string } },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.farmId) {
      return new NextResponse("Farm id is required", { status: 400 });
    }

    const farm = await prismadb.farm.deleteMany({
      where: {
        id: params.farmId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(farm);
  } catch (error) {
    console.error("[farm_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
