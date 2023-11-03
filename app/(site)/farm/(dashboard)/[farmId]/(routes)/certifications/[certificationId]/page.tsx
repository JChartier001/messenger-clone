import prismadb from '@/lib/prismadb';

import CertificationForm from './components/CertificationForm';

const CertificationPage = async ({
  params,
}: {
  params: { certificationId: string };
}) => {
  let certifications = null;

  if (params.certificationId !== 'new') {
    certifications = await prismadb.certifications.findUnique({
      where: {
        id: params.certificationId,
      },
    });
  }

  const types = await prismadb.certificationType.findMany({
    include: {
      certification: true,
    },
  });

  const otherTypes = [
    ...types,
    {
      id: 'other',
      name: 'Other',
      description: '',
      valid: true,
      certificationId: [],
      certification: [],
    },
  ];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CertificationForm initialData={certifications} types={otherTypes} />
      </div>
    </div>
  );
};

export default CertificationPage;
