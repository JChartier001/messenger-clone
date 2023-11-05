import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const order = await prismadb.order.findFirst({
      where: {
        id: id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        farm: true,
        payment: true,
      },
    });
    return NextResponse.json(order);
  } catch (err) {
    console.error("[ORDER_GET_BY_ID]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
