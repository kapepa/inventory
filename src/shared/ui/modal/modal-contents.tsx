import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, memo, type ReactNode } from "react";
import { Button, buttonVariants } from "../button";
import { VariantProps } from "class-variance-authority";
import { Loader } from "../loader";
import { FooterBar } from "../footer-bar";
import { OverlayBody } from "../overlay-body";

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
    <OverlayBody className={cn("", className)}>
      {children}
    </OverlayBody>
  );
});

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <FooterBar className={cn("", className)}>
      {children}
    </FooterBar>
  );
};