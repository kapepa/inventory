"use client"

import { cn, XButtonClose } from "@/shared"
import { ReactNode } from "react"

interface ProductsBodyProps {
  title: string,
  className?: string
  children: ReactNode,
  actions?: ReactNode,
  onCloseActions?: () => void
}

export const ProductsBody = ({ title, children, actions, className, onCloseActions }: ProductsBodyProps) => {
  return (
    <div
      className={cn("px-6 py-3 border rounded-md bg-card flex flex-col relative", className)}
    >
      <XButtonClose
        className="absolute top-0 right-0 translate-x-1/3 md:translate-x-1/2 -translate-y-1/2"
        onCloseAction={onCloseActions}
      />
      <div>
        <h4>{title}</h4>
        {actions}
      </div>
      {children}
    </div>
  )
}

ProductsBody.displayName = "ProductsBody"
