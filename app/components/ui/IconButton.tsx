import { MouseEventHandler } from "react";

import { cn } from "@/app/libs/utils";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full bg-white p-2 text-black shadow-md transition hover:scale-110",
        className,
      )}
    >
      {icon || children}
    </button>
  );
};

export default IconButton;
