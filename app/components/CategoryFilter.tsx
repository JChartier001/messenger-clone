'use client'
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/app/components/ui/DropdownMenu';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[] | [];
  className?: string;

}

const CategoryDropDown = ({ categories = [] }: Props) => {
  const params = useParams()

  const configureLinkURL = (category: Category) => {
    if (params?.filter ) {
      return `/store/${category.slug}/filters=${params.filter}`;
    } else {
      return `/store/${category.slug}`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:border-none disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white'>
          <span className='mr-2 flex text-black group-hover:text-white  dark:text-white dark:group-hover:text-black '>
            Category
          </span>
          <ChevronDown
            className='flex text-black group-hover:text-white  dark:text-white dark:group-hover:text-black '
            size={25}
          />
        </div>

        <DropdownMenuContent align='end' className='m-3'>
          {categories.map((category: Category) => (
            <DropdownMenuItem
              key={category.slug}
              className='hover:text-[#ed7f74]'
            >
              <Link href={configureLinkURL(category)}>{category.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default CategoryDropDown;
