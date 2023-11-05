"use client ";
import React, { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import axios from "axios";
import { User } from "@prisma/client";
interface FavShareGroupProps {
  shareLink: string;
  id: string;
  itemTitle: string;
  type: string;
  user: User | null;
}

const FavShareGroup = ({
  shareLink,
  id,
  itemTitle,
  type,
  user,
}: FavShareGroupProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const saveToFavorites = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      return router.push("/sign-in");
    }
    const favorites = user?.favorites || {
      farm: [],
      product: [],
    };
    if (user.favorites[type].includes(id)) {
      favorites[type] = favorites[type].filter(
        (itemId: string) => itemId !== id,
      );
    } else {
      favorites[type].push(id);
    }

    try {
      await axios.post("/api/user", {
        userId: user.id,
        updateBody: {
          publicMetadata: {
            ...user?.publicMetadata,
            favorites,
          },
        },
      });

      toast.success("Favorites Updated");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const shareToFacebook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareLink,
    )}`;
    window.open(url, "_blank");
  };

  const shareToX = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
    const text = `Check this out: ${itemTitle}`;
    const url = `https://www.x.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(shareLink)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex h-[100%] w-[75px] justify-between ">
      <Heart
        size={25}
        color={
          user?.publicMetadata?.favorites?.[type]?.includes(id)
            ? "rgba(255, 0, 0, 0.6)"
            : "#4b5563"
        }
        onClick={(e) => saveToFavorites(e)}
        fill={
          user?.publicMetadata?.favorites?.[type]?.includes(id)
            ? "rgba(255, 0, 0, 0.6)"
            : "#fff"
        }
      />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Share2
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              size={25}
              className="text-gray-600"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Share</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {" "}
              <button onClick={(e) => shareToFacebook(e)}>
                Share on Facebook
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDropdownOpen(!isDropdownOpen)}>
              <button onClick={(e) => shareToX(e)}>Share on X</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FavShareGroup;
