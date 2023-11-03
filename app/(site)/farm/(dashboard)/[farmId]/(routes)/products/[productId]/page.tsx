import prismadb from '@/lib/prismadb';

import ProductForm from './components/ProductForm';

const ProductPage = async ({
  params,
}: {
  params: { productId: string; farmId: string };
}) => {
  let product = null;
  if (params.productId !== 'new') {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });
  }

  const categories = await prismadb.category.findMany();
  const dietary = await prismadb.dietary.findMany();

  const sizes = await prismadb.unitLabel.findMany({
    where: {
      farmId: params.farmId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          categories={categories}
          dietary={dietary}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
