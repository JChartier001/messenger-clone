'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/app/libs/utils';

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/farm/${params?.farmId}`,
      label: 'Overview',
      active: pathname === `/farm/${params?.farmId}`,
    },
    {
      href: `/farm/${params?.farmId}/certifications`,
      label: 'Certifications',
      active: pathname === `/farm/${params?.farmId}/certifications`,
    },
    {
      href: `/farm/${params?.farmId}/sizes`,
      label: 'Sizes',
      active: pathname === `/farm/${params?.farmId}/sizes`,
    },
    {
      href: `/farm/${params?.farmId}/products`,
      label: 'Products',
      active: pathname === `/farm/${params?.farmId}/products`,
    },
    {
      href: `/farm/${params?.farmId}/orders`,
      label: 'Orders',
      active: pathname === `/farm/${params?.farmId}/orders`,
    },
    {
      href: `/farm/${params?.farmId}/settings`,
      label: 'Settings',
      active: pathname === `/farm/${params?.farmId}/settings`,
    },
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
export default MainNav;
