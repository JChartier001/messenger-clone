import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

import prismadb from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!body.name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const farm = await prismadb.farm.create({
      data: {
        ...body,
        slug: `${body.name.toLowerCase().replace(" ", "-")}-${body.address
          .toLowerCase()
          .replace(" ", "-")}-${body.city
          .toLowerCase()
          .replace(" ", "-")}-${body.state
          .toLowerCase()
          .replace(" ", "-")}-${body.zip.toLowerCase().replace(" ", "-")}`,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(farm);
  } catch (error) {
    console.error("[farmS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
