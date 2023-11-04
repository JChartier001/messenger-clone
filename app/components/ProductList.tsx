import ProductCard from '@/app/components/ProductCard';
import { Item } from '@/app/types';
import NoResults from '@/app/components/NoResults';

interface ProductListProps {
  title: string;
  items: Item[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-3xl font-bold'>{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className='flex flex-wrap justify-center md:justify-start '>
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
