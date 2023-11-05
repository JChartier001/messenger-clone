import { NextResponse } from "next/server";

import prismadb from "@/app/libs/prismadb";

export async function GET(req: Request) {
  try {
    const products = await prismadb.product.findMany({
      include: {
        images: true,
        category: true,
        dietary: true,
        farm: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
