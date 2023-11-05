"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";

import Checkbox from "@/app/components/ui/Checkbox";
import Button from "@/app/components/ui/Button";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  value: string[];
  name: string;
  onChange: (selection: string) => void;
  onRemove: (selection: string) => void;
  defaultValue?: string[];
  label: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,

  value,
  onChange,
  onRemove,
  label,
}) => {
  const [open, setOpen] = useState(false);

  const onCheckChange = (option: string) => {
    value?.includes(option) ? onRemove(option) : onChange(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label={label}
          className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {value?.length ? (
            value
              .map(
                (item) =>
                  options.find((option) => option.value === item)?.label,
              )
              .join(", ")
          ) : (
            <span>{label}</span>
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem key={option.value}>
            <Checkbox
              className="mr-4"
              onCheckedChange={() => onCheckChange(option.value)}
              checked={value?.includes(option.value)}
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
