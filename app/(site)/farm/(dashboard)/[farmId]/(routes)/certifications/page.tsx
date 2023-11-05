import { format } from "date-fns";

import prismadb from "@/app/libs/prismadb";

import { CertificationColumn } from "./components/columns";
import CertificationsClient from "./components/client";

const CertificationsPage = async ({
  params,
}: {
  params: { farmId: string };
}) => {
  const certifications = await prismadb.certification.findMany({
    where: {
      farmId: params.farmId,
    },
    include: {
      type: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCertifications: CertificationColumn[] = certifications.map(
    (item) => ({
      id: item.id,
      name: item.type.name,
      approved: item.approved ? "Yes" : "No",
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CertificationsClient data={formattedCertifications} />
      </div>
    </div>
  );
};

export default CertificationsPage;
