'use client';

import { ShoppingBag, Tractor, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import  Button from '@/app/components/ui/Button';
import useCart from '@/app/hooks/useCart';

import ThemeToggle from './ThemeToggle';
import { LayoutDashboard } from 'lucide-react';
import { User } from '@prisma/client';

interface NavbarActionsProps { 
  user: User
}

const NavbarActions: React.FC<NavbarActionsProps> = ({user}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();
  const count = cart.order
    .map((order) => order.items.reduce((sum, item) => sum + item.quantity!, 0))
    .reduce((a, b) => a + b, 0);

  if (!isMounted) {
    return null;
  }
  return (
		<div className='ml-auto flex items-center gap-x-4'>
			{/* <ToolTip content='Shop'> */}
			<ThemeToggle />
			<Button variant='text' className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '>
				<Store
					size={20}
					className='text-black group-hover:text-white  dark:text-white dark:group-hover:text-black '
					onClick={() => router.push('/store')}
				/>
			</Button>
			{/* </ToolTip> */}
			{!user?.id && !user?.email ? (
				<>
					<Button onClick={() => router.push('/sign-in')}>Login</Button>
					<Button onClick={() => router.push('/sign-up')}>Register</Button>
				</>
			) : (
				<>
					{/* <ToolTip
            content={
              user.publicMetadata.role === 'farmer'
                ? 'Farm Dashboard'
                : 'Add a Farm'
            }
          > */}
					<div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '>
						<Tractor
							size={20}
							className='text-black group-hover:text-white  dark:text-white dark:group-hover:text-black '
							onClick={() => router.push('/farm')}
						/>
					</div>
					{/* </ToolTip>
          <ToolTip content='Dashboard'> */}
					<div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '>
						<LayoutDashboard
							size={20}
							className='text-black group-hover:text-white  dark:text-white dark:group-hover:text-black '
							onClick={() => router.push('/customer')}
						/>
					</div>
					{/* </ToolTip>
          <ToolTip content='Cart'> */}
					<div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '>
						<ShoppingBag
							size={20}
							className='text-black group-hover:text-white  dark:text-white dark:group-hover:text-black '
							onClick={() => router.push('/cart')}
						/>
						<span className='ml-1 text-sm font-medium text-black group-hover:text-white  dark:text-white dark:group-hover:text-black'>
							{count}
						</span>
					</div>
					{/* </ToolTip> */}
					<div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '></div>
					{/* <ToolTip content='Profile'> */}
					<div className='group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white '>
						{/* <UserButton /> */}
					</div>
					{/* </ToolTip> */}
				</>
			)}
		</div>
	);
};

export default NavbarActions;
