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
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCloseAction]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-200 supports-backdrop-filter:backdrop-blur-xs"
        onClick={(e) => {
          e.stopPropagation();
          onCloseAction();
        }}
      />

      {/* Modal content */}
      <div
        aria-hidden="true"
        className="relative z-50 w-full max-w-lg px-4 animate-in zoom-in-95 duration-200"
      >
        <div
          className={cn("bg-white rounded-sm shadow-2xl relative", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <XButtonClose
            className="absolute top-0 right-0 translate-x-1/3 md:translate-x-1/2 -translate-y-1/2"
            onCloseAction={onCloseAction}
          />
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
});