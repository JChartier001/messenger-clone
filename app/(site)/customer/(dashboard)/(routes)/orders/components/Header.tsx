import { Order } from '@/types';
import React from 'react';
import Date from '@/components/ui/Date';
import Currency from '@/components/ui/currency';
import ToolTip from '@/components/ToolTip';
import { useUser } from '@clerk/nextjs';

interface OrderHeaderProps {
  order: Order;
}

const OrderHeader = ({ order }: OrderHeaderProps) => {
  const { user } = useUser();

  const address = order.address.split(',');

  return (
    <div className='flex w-full items-center justify-center bg-gray-50 p-3  dark:bg-gray-900'>
      <div className='grid grid-cols-4 '>
        <div>
          <p>ORDER PLACED</p>
          <Date dateString={order.createdAt} />
        </div>

        <div className=''>
          <p>Total</p>
          {order.payment?.amount ? (
            <Currency value={order.payment?.amount / 100} />
          ) : (
            <p className="text-red-500 font-semibold">Not Paid</p>
          )}
        </div>
        <div>
          <p>FARM</p>
          <ToolTip
            content={
              <div>
                <h6>{user.fullName}</h6>
                <p>{address[0]}</p>
                <p>
                  {address[1]}, {address[2]} {address[3]}
                </p>
              </div>
            }
          >
            {order.farm.name}
            {/* {user.fullName} */}
          </ToolTip>
          {}
        </div>
        <div>
          <p>ORDER ID</p>
          <p>{order.id}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
