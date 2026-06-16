import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, memo, type ReactNode } from "react";
import { Button, buttonVariants } from "../button";
import { VariantProps } from "class-variance-authority";
import { Loader } from "../loader";

interface ModalContentsProps {
  children: ReactNode;
  className?: string;
}

export const ModalContents = memo(({ children, className }: ModalContentsProps) => {
  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {children}
    </div>
  );
});


interface ModalHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export const ModalHeader = memo(({ title, description, className }: ModalHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 pb-2 px-6 pt-6 md:pb-4 border-b border-border", className)}>
      <h2 className="text-xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
});

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModalBody = memo(({ children, className }: ModalBodyProps) => {
  return (
    <div className={cn("px-4 md:px-6 py-4", className)}>
      {children}
    </div>
  );
});

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={cn(
      "grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 px-4 pb-4 pt-3 md:px-6 md:pb-6 md:pt-4 bg-accent",
      className
    )}>
      {children}
    </div>
  );
};