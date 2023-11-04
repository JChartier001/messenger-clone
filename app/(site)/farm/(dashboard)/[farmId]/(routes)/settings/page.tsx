import prismadb from '@/app/libs/prismadb';

import SettingsForm from './components/SettingsForm';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';

const SettingsPage = async ({ params }: { params: { farmId: string } }) => {
	let farm = null;
	if (params.farmId !== 'new') {
		farm = await prismadb.farm.findUnique({
			where: {
				id: params.farmId,
			},
		});
	}

	const title = params.farmId === 'new' ? 'Create farm' : 'Edit farm';
	const description =
		params.farmId === 'new'
			? 'Add a new farm to manage products and categories.'
			: 'Edit your farm details.';

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SettingsForm initialData={farm} />
			</div>
		</div>
	);
};

export default SettingsPage;
