import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const navLinkVariants = cva(
  "nav-link",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-accent-color",
        muted: "text-muted-foreground hover:text-accent-color",
        accent: "text-accent-color",
      },
      active: {
        true: "nav-link--active",
        false: "",
      },
      uppercase: {
        true: "uppercase",
        false: "",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
      uppercase: false,
      size: "default",
    },
  }
)

export interface NavLinkProps
  extends React.ComponentProps<typeof Link>,
  VariantProps<typeof navLinkVariants> { }

function NavLink({
  className,
  variant,
  active,
  uppercase,
  size,
  children,
  ...props
}: NavLinkProps) {
  return (
    <Link
      className={cn(
        navLinkVariants({ variant, active, uppercase, size }),
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export { NavLink, navLinkVariants }