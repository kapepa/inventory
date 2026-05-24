"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-20 animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full rounded-md max-w-lg px-4 animate-in zoom-in-95 duration-200">
        <div className={cn("bg-white rounded-sm shadow-2xl relative ", className)}>
          <Button
            onClick={onClose}
            className=" text-gray-500 hover:text-gray-700 transition-colors cursor-pointer absolute top-0 right-0 bg-background size-10 rounded-full translate-x-1/3 md:translate-x-1/2 -translate-y-1/2 border border-chart-1 shadow-lg "
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </Button>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};