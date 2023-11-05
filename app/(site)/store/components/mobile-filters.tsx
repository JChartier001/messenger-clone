"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import { Dietary } from "@prisma/client";
import Filter from "./filter";
import { Sheet, SheetTrigger, SheetContent } from "@/app/components/ui/sheet";

interface MobileFiltersProps {
  dietary: Dietary[];
}

const MobileFilters = ({ dietary }: MobileFiltersProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="mt-6 flex w-[175px] items-center gap-x-2 whitespace-nowrap lg:hidden">
          Dietary Filters
          <Plus size={20} />
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[250px] bg-secondary p-0 pt-10 dark:bg-slate-950"
      >
        <Filter data={dietary} name="Dietary Filters" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
