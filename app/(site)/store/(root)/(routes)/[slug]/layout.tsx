import React from "react";
import Billboard from "@/app/components/ui/Billboard";

const StoreLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <div className="w-full pb-5">
      <Billboard slug={`${params.slug}`} />
      {children}
    </div>
  );
};

export default StoreLayout;
