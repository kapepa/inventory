"use client";

import { Button } from "./button";
import { ChevronLeft } from "lucide-react";
import { cn, useRouter } from "../lib";
import { HTMLAttributes } from "react";
import { Skeleton } from "./skeleton";

interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
}

export const BackButton = ({ className, label, ...props }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className={cn("bg-accent rounded-full cursor-pointer", className)}
      onClick={() => router.back()}
      {...props}
    >
      <ChevronLeft className="size-6" />
    </Button>
  );
};

BackButton.displayName = "BackButton"

export const BackButtonSkeleton = ({ className }: { className?: string }) => {

  return (
    <Skeleton className={cn("size-8 rounded-full", className)} />
  )
};

BackButtonSkeleton.displayName = "BackButtonSkeleton"