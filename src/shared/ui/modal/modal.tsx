"use client";

import { memo, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/utils";
import { XButtonClose } from "../x-button-close";

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = memo(({ isOpen, onCloseAction, children, className }: ModalProps) => {
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
          <XButtonClose className="absolute top-0 right-0 translate-x-1/3 md:translate-x-1/2 -translate-y-1/2" onCloseAction={onCloseAction} />
          {children}
        </div>
      </div>
    </>,
    document.body
  );
});