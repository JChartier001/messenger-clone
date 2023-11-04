import React from 'react';
import StoreNavbar from '@/components/StoreNavbar';
import prismadb from '@/app/libs/prismadb';

const ProductLayout = async ({ children }: { children: React.ReactNode }) => {
	const categories = await prismadb.category.findMany({});
	return (
		<div>
			<StoreNavbar categories={categories} />
			{children}
		</div>
	);
};

export default ProductLayout;
