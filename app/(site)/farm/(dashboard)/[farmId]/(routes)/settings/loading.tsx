'use client';

import LoadingModal from "@/app/components/modals/LoadingModal";

const Loading = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <LoadingModal />
    </div>
  );
};

export default Loading;
