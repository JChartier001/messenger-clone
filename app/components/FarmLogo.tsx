import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FarmLogoType } from '@/types';
import cn from 'classnames';
import Rating from '@/components/ui/Rating';

const FarmLogo = ({
  farm,
  color,
}: {
  farm: FarmLogoType | null;
  color?: string;
}) => {
  const tempRate = Math.floor(Math.random() * 5) + 1;
  const tempCount = Math.floor(Math.random() * 1000);
  return (
    <div className='flex items-center gap-1'>
      <Avatar className='h-14 w-14'>
        <AvatarImage
          src={farm?.logo[0]?.url}
          alt={farm?.name}
          className='object-fill'
        />
        <AvatarFallback>{farm?.name.match(/\b(\w)/g)?.join('')}</AvatarFallback>
      </Avatar>
      <div className='ml-2 w-[100%]'>
        <p className={cn('text-sm', color)}>{farm?.name}</p>
        <Rating
          rate={tempRate}
          count={tempCount}
          color={'#FFDF00'}
          size={15}
          className='my-1 flex'
        />
        <p className='mr-2 text-xs text-muted-foreground'>
          {farm?.city}, {farm?.state.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default FarmLogo;
