import React from "react";

import OrdersPage from "./page";

import getCurrentUser from "@/app/actions/getCurrentUser";

const OrdersLayout = async () => {
  const currentUser = await getCurrentUser();
  return <OrdersPage user={currentUser} />;
};

export default OrdersLayout;
