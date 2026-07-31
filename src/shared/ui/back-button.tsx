"use client";

import { Button } from "./button";
import { ChevronLeft } from "lucide-react";
import { cn } from "../lib";
import { HTMLAttributes } from "react";
import { Skeleton } from "./skeleton";
import { useRouter } from "../lib/i18n/routing";

interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const BackButton = ({ className, ...props }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      type="button"
      size="icon"
      aria-label="Back"
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