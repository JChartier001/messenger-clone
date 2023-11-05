"use client";
import React, { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/app/libs/utils";

import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/app/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/Popover";
import { useRouter, useParams } from "next/navigation";
import { Dietary } from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface FilterProps extends PopoverTriggerProps {
  data: Dietary[] | [];
}

const Filter: React.FC<FilterProps> = ({ data = [] }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = React.useState(false);

  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    if (params?.slug !== undefined) {
      if (typeof params.slug === "string") {
        const filters = params.slug.split("-");
        setFilters(filters);
      }
    }
  }, [params?.slug]);

  const onClick = (slug: string) => {
    const newFilters = filters.includes(slug)
      ? filters.filter((filter) => filter !== slug)
      : [...filters, slug];
    setFilters(newFilters);

    const paramsSlug = params?.slug === undefined ? "all" : params.slug;

    router.push(`/store/${paramsSlug}/${newFilters.join("-")}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="group flex  items-center justify-center rounded-full  border-none bg-white p-2 text-sm font-medium transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:border-none disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-white">
          <span className="mr-2 flex text-black group-hover:text-white  dark:text-white dark:group-hover:text-black ">
            Dietary
          </span>
          <ChevronDown
            size={25}
            className="flex text-black group-hover:text-white  dark:text-white dark:group-hover:text-black "
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {data.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => onClick(option.slug)}
                className="text-sm"
              >
                {option.name}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    filters.includes(option.slug) ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
