import React from "react";
import StoreModalProvider from "@/providers/StoreModalProvider";

const StoreLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-5">
      <div className="flex flex-row ">{children}</div>
      <StoreModalProvider />
    </div>
  );
};

export default StoreLayout;
