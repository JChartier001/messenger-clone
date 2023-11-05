import prismadb from "@/app/libs/prismadb";

interface Props {
  slug: string;
}

const Billboard = async ({ slug }: Props) => {
  let category;
  if (slug === "all")
    category = {
      Billboard: [
        {
          imageUrl:
            "https://res.cloudinary.com/dcw6etnyk/image/upload/v1696371764/fv7ekpzcs5ajbxiyxluy.png",
        },
      ],
    };
  else {
    category = await prismadb.category.findUnique({
      where: {
        slug: slug,
      },
      include: {
        Billboard: true,
      },
    });
  }

  return (
    <div className="rounded-xl p-3">
      <div
        style={{ backgroundImage: `url(${category?.Billboard[0].imageUrl})` }}
        className="aspect-rectangle relative overflow-hidden rounded-xl bg-cover bg-center md:aspect-[2.4/1] xl:aspect-[3/1]"
      ></div>
    </div>
  );
};

export default Billboard;
