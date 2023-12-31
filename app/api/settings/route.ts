import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();
    const { name, image } = body;

    if (!currentUser?.id)
      return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "SETTINGS ROUTE ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
