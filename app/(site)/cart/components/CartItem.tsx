import Image from "next/image";
import { X } from "lucide-react";
import FarmLogo from "@/app/components/FarmLogo";

import IconButton from "@/app/components/ui/IconButton";
import Currency from "@/app/components/Currency";
import useCart from "@/app/hooks/useCart";
import { Item } from "@/app/types";

interface CartItemProps {
  data: Item;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data);
  };

  return (
    <li className="flex max-w-[600px] border-b py-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col  sm:ml-6">
        <div className="absolute right-0 top-0 z-10">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="ml-4pl-4 text-gray-500 dark:text-gray-400">
              {data.label.name}
            </p>
          </div>
          <Currency value={data.price} />
          <p>{data.quantity} </p>
        </div>
        <FarmLogo farm={data.farm!} />
      </div>
    </li>
  );
};

export default CartItem;
