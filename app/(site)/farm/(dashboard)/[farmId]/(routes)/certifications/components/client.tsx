'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import  Button  from '@/app/components/ui/Button';
import DataTable from '@/app/components/ui/DataTable';
import Heading from '@/app/components/ui/Heading';
import  Separator  from '@/app/components/ui/Separator';

import { columns, CertificationColumn } from './columns';

interface CertificationClientProps {
  data: CertificationColumn[];
}

const CertificationsClient: React.FC<CertificationClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Certifications (${data.length})`}
          description='Manage certifications for your farm'
        />
        <Button
          onClick={() =>
            router.push(`/farm/${params?.farmId}/certifications/new`)
          }
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
    </>
  );
};
export default CertificationsClient;
