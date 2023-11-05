import prismadb from "@/app/libs/prismadb";

import SizeForm from "./components/SizeForm";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  let size = null;
  if (params.sizeId !== "new") {
    size = await prismadb.unitLabel.findUnique({
      where: {
        id: params.sizeId,
      },
    });
  }

  return <SizeForm initialData={size} />;
};

export default SizePage;
