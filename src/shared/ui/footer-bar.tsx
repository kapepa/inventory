import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const FooterBar = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={cn(
      "grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4 bg-accent justify-end",
      className
    )}>
      {children}
    </div>
  );
};

FooterBar.displayName = "FooterBar"