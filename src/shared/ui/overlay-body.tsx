import { memo, ReactNode } from "react";
import { cn } from "../lib";

interface OverlayBodyProps {
  children: ReactNode;
  className?: string;
}

export const OverlayBody = memo(({ children, className }: OverlayBodyProps) => {
  return (
    <div className={cn("px-4 md:px-6 py-4", className)}>
      {children}
    </div>
  );
});

OverlayBody.displayName = "OverlayBody"