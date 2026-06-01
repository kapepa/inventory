import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, memo, type ReactNode } from "react";
import { Button, buttonVariants } from "../button";
import { VariantProps } from "class-variance-authority";

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
    <div className={cn("flex flex-col gap-1.5 px-6 pt-6 pb-4 border-b border-border", className)}>
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
    <div className={cn("px-6 py-4", className)}>
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
      "flex items-center justify-end gap-3",
      "px-6 pb-6 pt-4 bg-accent",
      className
    )}>
      {children}
    </div>
  );
};

interface ModalCancelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onCancelAction?: () => void;
}

export const ModalCancelButton = memo(({ children, className, onCancelAction, ...props }: ModalCancelButtonProps) => {
  return (
    <Button
      variant="simply-transparency"
      className={cn("px-7 py-5 rounded-full uppercase", className)}
      onClick={onCancelAction}
      {...props}
    >
      {children}
    </Button>
  );
});

interface ModalActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Extract<VariantProps<typeof buttonVariants>['variant'], "simply-accent" | "simply-destructive">;
  children: ReactNode;
  className?: string;
  onConfirmAction?: () => void;
}

export const ModalActionButton = ({ variant, children, className, onConfirmAction, ...props }: ModalActionButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn("px-7 py-5 rounded-full uppercase", className)}
      onClick={onConfirmAction}
      {...props}
    >
      {children}
    </Button>
  );
};

