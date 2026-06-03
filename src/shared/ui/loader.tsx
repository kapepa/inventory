import { Loader2, LucideProps } from "lucide-react"
import { cn } from "../lib"

interface LoaderProps extends LucideProps {
  className?: string
}

export const Loader = ({ className, ...props }: LoaderProps) => {
  return (
    <Loader2 className={cn("h-5 w-5 animate-spin", className)} {...props} />
  )
}
