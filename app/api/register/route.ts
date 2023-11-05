import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    delete body.password;
    const user = await prisma.user.create({
      data: {
        ...body,
        hashedPassword,
        //   favorites: {
        //     create: {
        //       farmIds: [],
        //       productIds: []
        //     }
        // },
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTER ERROR");
    return new NextResponse(error, { status: 500 });
  }
}
