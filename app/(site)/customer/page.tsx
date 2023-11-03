'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Package, MessagesSquare, User2 } from 'lucide-react';

const CustomerPage = () => {
  const router = useRouter();
  const { user } = useUser();
  if (!user) return router.push('/sign-in');

  const routes = [
    {
      href: `/customer/orders`,
      label: 'Orders',
      icon: Package,
      description:
        'Dive into your shopping history! Review past purchases, track current orders, and manage future deliveries.',
    },
    {
      href: `/customer/favorites`,
      label: 'Favorites',
      icon: Heart,
      description:
        "Your personal curated collection! Rediscover items you've loved before and make future shopping a breeze.",
    },
    {
      href: `/customer/messages`,
      label: 'Messages',
      icon: MessagesSquare,
      description:
        'Stay connected with your farmers! Get timely updates, ask questions, and ensure your orders are just right.',
    },
    {
      href: `/customer/profile`,
      label: 'Profile',
      icon: User2,
      description:
        'Master your profile. Fine-tune details, set new passwords, and ensure your account is always up-to-date."',
    },
  ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      {routes.map((route, i) => {
        return (
          <Card
            key={i}
            onClick={() => router.push(route.href)}
            className='max-w-xlg m-5 cursor-pointer '
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-lg font-bold text-gray-600'>
                <route.icon className='mb-3 h-10 w-10 text-gray-600' />
                {route.label}
              </CardTitle>
            </CardHeader>
            <CardContent>{route.description}</CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CustomerPage;
