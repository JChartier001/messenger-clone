import { CreditCard, DollarSign, Package } from "lucide-react";

import Separator from "@/app/components/ui/Separator";
import Overview from "@/app/components/Overview";
import Card from "@/app/components/ui/Card";
import Heading from "@/app/components/ui/Heading";
import { getTotalRevenue } from "@/app/actions/getTotalRevenue";
import { getSalesCount } from "@/app/actions/getSalesCount";
import { getGraphRevenue } from "@/app/actions/getGraphRevenue";
import { getStockCount } from "@/app/actions/getStockCount";
import { formatter } from "@/app/libs/utils";

interface DashboardPageProps {
  params: {
    farmId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.farmId);
  const graphRevenue = await getGraphRevenue(params.farmId);
  const salesCount = await getSalesCount(params.farmId);
  const stockCount = await getStockCount(params.farmId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your farm" />
        <Separator />
        <div className="flex flex-col justify-between sm:grid grid-cols-3 w-full">
          <Card className="sm:mr-4 sm:my-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h6 className="text-md font-medium">Total Revenue</h6>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="text-2xl font-bold">
              {formatter.format(totalRevenue)}
            </div>
          </Card>

          <Card className="sm:mr-4 my-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h6 className="text-md font-medium">Sales</h6>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </div>
          </Card>
          <Card className="my-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h6 className="text-md font-medium">Products In Stock</h6>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stockCount}</div>
            </div>
          </Card>

          <Card className="col-span-4">
            <div>
              <h4 className="text-2xl p-5 pl-10">Overview</h4>
            </div>
            <div className="pl-2">
              <Overview data={graphRevenue} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
