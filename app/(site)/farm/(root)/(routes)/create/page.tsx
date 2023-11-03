import SettingsForm from '../../../(dashboard)/[farmId]/(routes)/settings/components/SettingsForm';
import Heading from '@/components/ui/Heading';

const CreateFarmPage = async () => {
  const title = 'Create farm';
  const description = 'Add a new farm to manage products and categories.';

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title={title} description={description} />
        <SettingsForm initialData={null} />
      </div>
    </div>
  );
};

export default CreateFarmPage;
