import { cn } from "@/shared/lib"
import { ReactNode, HTMLAttributes } from "react"

type StateVariant = "default" | "destructive" | "success" | "warning" | "info"

const variantStyles: Record<StateVariant, {
  text: string
}> = {
  default: {
    text: "text-muted-foreground",
  },
  destructive: {
    text: "text-destructive",
  },
  success: {
    text: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    text: "text-amber-600 dark:text-amber-400",
  },
  info: {
    text: "text-sky-600 dark:text-sky-400",
  },
}

interface StateMessageProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  variant?: StateVariant
}

export const StateMessage = ({
  className,
  children,
  variant = "default",
  ...props
}: StateMessageProps) => {
  const styles = variantStyles[variant]
  const isStringChild = typeof children === 'string' && children

  return (
    <div
      data-slot="state-message"
      data-variant={variant}
      className={cn(
        "flex items-center justify-center",
        !children && "w-full min-h-16 py-8",
        className
      )}
      {...props}
    >
      {isStringChild ? (
        <span className={cn("text-sm font-semibold", styles.text)}>
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  )
}

StateMessage.displayName = "StateMessage"