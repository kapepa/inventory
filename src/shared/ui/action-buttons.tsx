import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button, buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";
import { cn } from "../lib";
import { Loader } from "lucide-react";

interface CancelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onCancelAction?: () => void;
}

export const CancelButton = ({ children, className, onCancelAction, ...props }: CancelButtonProps) => {
  return (
    <Button
      type="button"
      variant="simply-transparency"
      className={cn("px-5 md:px-7 py-5 rounded-full uppercase", className)}
      onClick={onCancelAction}
      {...props}
    >
      {children}
    </Button>
  );
};

CancelButton.displayName = "CancelButton";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Extract<VariantProps<typeof buttonVariants>['variant'], "simply-accent" | "simply-destructive" | "default">;
  children: ReactNode;
  className?: string;
  onConfirmAction?: () => void;
  isLoading?: boolean;
}

export const SubmitButton = ({ variant, children, className, onConfirmAction, isLoading, ...props }: SubmitButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn(
        "px-5 md:px-7 py-5 rounded-full uppercase relative inline-flex items-center justify-center",
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

SubmitButton.displayName = "SubmitButton";