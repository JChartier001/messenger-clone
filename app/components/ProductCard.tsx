"use client";

import Image from "next/image";

import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import Currency from "@/app/components/Currency";
import IconButton from "@/app/components/ui/IconButton";
import usePreviewModal from "@/app/hooks/usePreviewModal";
import useCart from "@/app/hooks/useCart";

import Button from "@/app/components/ui/Button";
import { Item, Farm } from "@/app/types";
import FarmLogo from "@/app/components/FarmLogo";
import Rating from "@/app/components/Rating";
import FavShareGroup from "@/app/components/FavShareGroup";

interface InfoProps extends Item {
  farm?: Farm;
}
interface ProductCard {
  data: InfoProps;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const tempRate = Math.floor(Math.random() * 5) + 1;
  const tempCount = Math.floor(Math.random() * 1000);

  const handleClick = () => {
    router.push(`/product/${data?.slug}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem({ ...data, quantity: 1, subtotal: data.price });
  };

  return (
    <div
      onClick={handleClick}
      className="group m-3 min-w-[350px] max-w-xs cursor-pointer space-y-4 rounded-xl border bg-white p-3"
    >
      <div className="relative aspect-square rounded-xl bg-gray-100">
        <Image
          src={data.images?.[0]?.url}
          alt={data.name}
          fill
          className="aspect-square rounded-md object-cover"
          loader={({ src }) => src}
          priority={true}
        />
        <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[70%]">
          <p className="mr-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg text-gray-900 ">
            {data.name}
          </p>
          <p className="text-sm text-gray-500 ">{data.category?.name}</p>
        </div>
        <div>
          <FavShareGroup
            shareLink={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/product/${data.slug}`}
            id={data.id}
            itemTitle={data.name}
            type="product"
          />
        </div>
      </div>
      <div className="flex justify-between ">
        <Rating rate={tempRate} count={tempCount} color={"#FFDF00"} size={20} />
        <Button className="w-fit whitespace-nowrap" onClick={onAddToCart}>
          Add To Cart
        </Button>
      </div>

      <FarmLogo farm={data.farm!} color="text-slate-950" />
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
        <p className="text-[#ed7f74]">{data.label?.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
{
  /* <div className='align-center flex h-[] justify-between '>
  <div className='mt-2 flex'>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star color='#FFDF00' fill='#FFDF00' size={20} key={i} />
    ))}
  </div>
  <div className='mt-4 flex max-w-[60px] justify-end '>
    <Heart size={25} className='m-0 p-0 text-gray-600' />
    <Share2 size={25} className='text-gray-600' />
  </div>
</div>; */
}
