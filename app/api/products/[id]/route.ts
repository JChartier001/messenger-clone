import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const product = await prismadb.product.findUnique({
      where: { id: id },
      include: { images: true, category: true, label: true, farm: true },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("[PRODUCTS_BY_ID_GET]", error);
    return new NextResponse(`Internal server error: ${error.message}`, {
      status: 500,
    });
  }
}
