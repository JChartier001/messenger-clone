import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/app/libs/utils";

type RatingProps = {
  rate: number;
  count: number;
  color: string;
  size: string | number;
  className?: string;
};

const Rating: React.FC<RatingProps> = ({
  rate,
  count,
  color,
  size,
  className,
}) => {
  const array = Array.from(Array(rate).keys());
  return (
    <div className={cn("", className)}>
      <div className="flex">
        {array.map((i) => (
          <Star color={color} fill={color} size={size} key={i} />
        ))}
      </div>
      <p className={cn("text-xs text-muted-foreground", className && "ml-2")}>
        {count} reviews
      </p>
    </div>
  );
};

export default Rating;
