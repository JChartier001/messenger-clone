'use client';

import Container from '@/components/ui/container';
import NavbarActions from '@/components/NavbarActions';
import { useRouter, usePathname } from 'next/navigation';
import Filter from '../app/store/components/filter';
import StoreMainNav from '@/app/store/components/CategoryDropdown';
import MobileSidebar from './MobileSideBar';
import MainNav from './MainNav';
import FarmSwitcher from './FarmSwitcher';
import { Category, Dietary } from '@prisma/client';

interface Farm {
  name: string;
  id: string;
}
interface NavProps {
  farms: Farm[];
  className?: string;

  categories: Category[];
  dietary: Dietary[];
}

const Navbar: React.FC<NavProps> = ({ farms, dietary, categories }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='border-b'>
      <Container>
        <div className='relative flex h-16 items-center px-4 sm:px-6 lg:px-8'>
          <div
            className='min-w-[50px] cursor-pointer'
            onClick={() => router.push('/')}
          >
            <div className="hidden h-[100px] w-[150px] bg-[url('/logo.png')] bg-cover dark:h-[100px] dark:w-[150px] dark:bg-[url('/dark_logo.png')] dark:bg-cover xs:flex " />
            <div className="h-[50px] w-[50px] bg-[url('/mobile_logo.png')] bg-cover dark:h-[50px] dark:w-[50px] dark:bg-[url('/mobile_dark_logo.png')] dark:bg-cover xs:hidden" />
          </div>
          {pathname.includes('farm') && (
            <div className='flex h-16 items-center px-4'>
              <MobileSidebar />
              <FarmSwitcher items={farms} />
              <MainNav className='mx-6  hidden md:flex' />
              <div className='ml-auto flex items-center space-x-4'></div>
            </div>
          )}
          {pathname.includes('store') && (
            <div>
              <Filter data={dietary} name='Dietary' />
              <StoreMainNav categories={categories} />
            </div>
          )}
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
