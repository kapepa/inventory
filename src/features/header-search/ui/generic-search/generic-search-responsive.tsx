import { Button, cn } from "@/shared"
import { Search } from "lucide-react"
import { ReactNode } from "react"

interface GenericSearchResponsive {
  children: ReactNode,
  className?: string,
  openSearch: () => void
}

export const GenericSearchResponsive = ({ children, className, openSearch }: GenericSearchResponsive) => {
  return (
    <>
      <div className={cn("hidden lg:flex items-center grow", className)}>
        {children}
      </div>
      <div className="flex lg:hidden items-center justify-end md:justify-center grow">
        <Button variant="link" className="rounded-s-sm cursor-pointer" onClick={openSearch}>
          <Search className="size-7 sm:size-9 text-accent" />
        </Button>
      </div>
    </>
  )
}

GenericSearchResponsive.displayName = "GenericSearchResponsive"