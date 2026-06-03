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

export const ModalCancelButton = ({ children, className, onCancelAction, ...props }: ModalCancelButtonProps) => {
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
};

interface ModalActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Extract<VariantProps<typeof buttonVariants>['variant'], "simply-accent" | "simply-destructive">;
  children: ReactNode;
  className?: string;
  onConfirmAction?: () => void;
  isLoading?: boolean;
}

export const ModalActionButton = ({ variant, children, className, onConfirmAction, isLoading, ...props }: ModalActionButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn(
        "px-7 py-5 rounded-full uppercase min-w-32 relative",
        "inline-flex items-center justify-center",
        className
      )}
      onClick={onConfirmAction}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className={cn(
        "transition-all duration-200",
        isLoading ? "opacity-0 invisible" : "opacity-100 visible"
      )}>
        {children}
      </span>

      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-5 w-5" />
        </span>
      )}
    </Button>
  );
};
