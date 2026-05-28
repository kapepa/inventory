"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
  className?: string;
}

const closeButtonClasses = cn(
  "flex justify-center items-center",
  "transition-colors cursor-pointer",
  "absolute top-0 right-0",
  "bg-background size-10 rounded-full",
  "translate-x-1/3 md:translate-x-1/2 -translate-y-1/2",
  "border border-chart-1 shadow-lg",
  "hover:bg-muted hover:shadow-xl",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-chart-2",
  "active:scale-100"
);

export const Modal = ({ isOpen, onCloseAction, children, className }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCloseAction]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-20 animate-in fade-in duration-200"
        onClick={onCloseAction}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full rounded-md max-w-lg px-4 animate-in zoom-in-95 duration-200">
        <div className={cn("bg-white rounded-sm shadow-2xl relative ", className)}>
          <button
            onClick={onCloseAction}
            className={closeButtonClasses}
            aria-label="close"
          >
            <X className="w-6 h-6 text-chart-2" />
          </button>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};