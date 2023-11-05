"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import { cn } from "@/app/libs/utils";

interface CheckboxProps {
  label: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
  className?: string;
  description?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,

  required,
  register,
  errors,
  disabled,
  className,
  description,
}) => (
  <div className="space-y-5">
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          aria-describedby={id}
          disabled={disabled}
          {...register(id, { required })}
          type="checkbox"
          className="rounded-md border-0 h-5 w-5 border-gray-300   text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor="comments" className="font-medium">
          {label}
        </label>{" "}
        <span id="comments-description" className="text-gray-500">
          <span className="sr-only">{id}</span>
          {description}
        </span>
      </div>
    </div>
  </div>
);

export default Checkbox;
