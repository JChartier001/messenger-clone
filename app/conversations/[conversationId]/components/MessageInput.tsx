"use client";
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  type?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  register,
  required,
  errors,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        autoComplete={id}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
