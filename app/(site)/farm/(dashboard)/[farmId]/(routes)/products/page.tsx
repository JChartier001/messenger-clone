import { format } from 'date-fns';

import prismadb from '@/app/libs/prismadb';
import { cn, formatter } from '@/lib/utils';

import { ProductsClient } from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async ({ params }: { params: { farmId: string } }) => {
	const products = await prismadb.product.findMany({
		where: {
			farmId: params.farmId,
		},
		include: {
			category: true,
			farm: true,
			dietary: true,
			label: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	const formattedProducts: ProductColumn[] = products.map(item => ({
		id: item.id,
		name: item.name,
		isFeatured: item.isFeatured ? 'Yes' : 'No',
		isArchived: item.isArchived ? 'Yes' : 'No',
		price: formatter.format(item.price),
		category: item.category.name,
		dietary: item.dietary.map(diet => diet.name).join(', '),
		label: item.label.name,
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductsClient data={formattedProducts} />
			</div>
		</div>
	);
};

export default ProductsPage;
