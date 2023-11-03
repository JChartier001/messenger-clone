import ProductList from '@/components/ProductList';
import Gallery from '@/components/gallery';
import Info from '@/components/Info';
import prismadb from '@/lib/prismadb';

import Container from '@/components/ui/container';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await prismadb.product.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      images: true,
      category: true,
      label: true,
      dietary: true,
    },
  });
  const suggestedProducts = await prismadb.product.findMany({
    where: {
      categoryId: product?.categoryId,
    },
    include: {
      images: true,
      category: true,
      label: true,
      dietary: true,
      farm: true,
    },
  });
  const farm = await prismadb.farm.findFirst({
    where: {
      id: product?.farmId,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.images} />
            <div className='mt-10 px-4 '>
              <Info data={product} farm={farm} />
            </div>
          </div>
          <hr className='my-10' />
          <ProductList title='Related Items' items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
