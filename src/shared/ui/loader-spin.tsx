import { Loader2, LucideProps } from "lucide-react"
import { cn } from "../lib"

interface LoaderSpinProps extends LucideProps {
  className?: string,
}

export const LoaderSpin = ({ className, ...props }: LoaderSpinProps) => {
  return (
    <Loader2 aria-label="loader-spiner" className={cn("animate-spin text-accent", className)} {...props} />
  )
}

LoaderSpin.displayName = "LoaderSpin"