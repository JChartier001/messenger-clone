'use client';

import NextImage from 'next/image';
import { Tab } from '@headlessui/react';

import { Image } from '@/app/types';

import GalleryTab from './GalleryTab';

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tab.Group
      as='div'
      className='mx-auto flex max-w-2xl flex-col-reverse lg:m-0 xl:max-w-3xl'
    >
      <div className='mx-auto mt-6 w-full  sm:block '>
        <Tab.List className='grid grid-cols-4 gap-6'>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className='relative aspect-square h-full w-full overflow-hidden sm:rounded-lg'>
              <NextImage
                fill
                src={image.url}
                alt='Image'
                className='object-cover object-center'
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
