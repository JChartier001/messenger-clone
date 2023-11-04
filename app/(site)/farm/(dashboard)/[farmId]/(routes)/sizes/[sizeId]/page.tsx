import prismadb from '@/app/libs/prismadb';

import SizeForm from './components/SizeForm';

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
	let size = null;
	if (params.sizeId !== 'new') {
		size = await prismadb.unitLabel.findUnique({
			where: {
				id: params.sizeId,
			},
		});
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeForm initialData={size} />
			</div>
		</div>
	);
};

export default SizePage;
