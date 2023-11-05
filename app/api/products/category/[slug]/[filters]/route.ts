import { NextResponse } from "next/server";

import prismadb from "@/app/libs/prismadb";
import { Dietary } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { slug: string; filters: string } },
) {
  const { slug, filters } = params;
  const dietary = await prismadb.dietary.findMany();

  const parseFilters = (dietaryMap: Dietary[], filters = ""): string[] => {
    return dietaryMap.reduce((acc: string[], dietary: Dietary) => {
      if (filters.includes(dietary.slug)) {
        acc.push(dietary.id);
      }
      return acc;
    }, []);
  };

  try {
    const products =
      params.slug === "all"
        ? await prismadb.product.findMany({
            where: {
              dietaryIds: {
                hasEvery: parseFilters(dietary, filters),
              },
            },
            include: {
              images: true,
              category: true,
              label: true,
              dietary: true,
              farm: true,
            },
          })
        : await prismadb.product.findMany({
            where: {
              category: {
                slug: slug,
              },
              AND: {
                dietaryIds: {
                  hasEvery: parseFilters(dietary, filters),
                },
              },
            },
            include: {
              images: true,
              category: true,
              label: true,
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
