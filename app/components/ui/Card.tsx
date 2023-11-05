import React from "react";
import { cn } from "@/app/libs/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 p-5",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
