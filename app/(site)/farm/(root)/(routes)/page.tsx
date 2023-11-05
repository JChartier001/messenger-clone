import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

import LoadingModal from "@/app/components/modals/LoadingModal";

const SetupPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    redirect("/sign-in");
  }

  const farm = await prismadb.farm.findFirst({
    where: {
      userId: currentUser.id,
    },
  });

  if (farm) {
    redirect(`/farm/${farm.id}`);
  }
  if (!farm) {
    redirect("/farm/create");
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingModal />
    </div>
  );
};

export default SetupPage;
