'use client';

import Container from '@/app/components/ui/Container';
import NavbarActions from '@/app/components/NavbarActions';
import { useRouter, usePathname, useParams } from 'next/navigation';
import DietaryFilter from '@/app/components/DietaryFilter';
import CategoryFilter from '@/app/components/CategoryFilter';
// import MobileSidebar from './MobileSideBar';
import MainNav from './MainNav';
import FarmSwitcher from './FarmSwitcher';
import { Category, Dietary, User } from '@prisma/client';
import ThemeToggle from './ThemeToggle';

interface Farm {
  name: string;
  id: string;
}
interface NavProps {
  farms: Farm[] | [];
  className?: string;
	user: User | null;

  categories: Category[];
  dietary: Dietary[];
}

const Navbar: React.FC<NavProps> = ({ farms, dietary, categories, user }) => {
  const router = useRouter();
  const pathname = usePathname();
 

  return (
		<div className='border-b border-slate-200 dark:border-slate-800/60'>
			<Container>
				<div className='relative flex h-16 items-center px-4 sm:px-6 lg:px-8'>
					<div
						className='min-w-[50px] cursor-pointer'
						onClick={() => router.push('/')}
					>
						<div className="hidden h-[100px] w-[150px] bg-[url('/images/logo.png')] bg-cover dark:h-[100px] dark:w-[150px] dark:bg-[url('/images/dark_logo.png')] dark:bg-cover sm:flex " />
						<div className="h-[50px] w-[50px] bg-[url('/images/mobile_logo.png')] bg-cover dark:h-[50px] dark:w-[50px] dark:bg-[url('/images/mobile_dark_logo.png')] dark:bg-cover sm:hidden" />
					</div>
					{pathname?.includes('farm') && (
						<div className='flex h-16 items-center px-4'>
							
							<FarmSwitcher items={farms} />
							<MainNav className='mx-6  hidden md:flex' />
							<div className='ml-auto flex items-center space-x-4'></div>
						</div>
					)}
					{pathname?.includes('store') && (
						<div>
							<DietaryFilter
								data={dietary}
								name='Dietary'							
							/>
							<CategoryFilter categories={categories}  />
						</div>
					)}
				
					<NavbarActions user={user} />
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
