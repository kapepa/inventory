import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import { Search } from "lucide-react"
import { ReactNode } from "react"

interface GenericSearchResponsive {
  children: ReactNode,
  className?: string,
  openSearch: () => void
  searchLabel?: string,
}

export const GenericSearchResponsive = ({ children, className, searchLabel, openSearch }: GenericSearchResponsive) => {
  return (
    <>
      <div className={cn("hidden lg:flex items-center grow", className)}>
        {children}
      </div>
      <div className="flex lg:hidden items-center justify-end md:justify-center grow">
        <Button
          type="button"
          variant="link"
          className="rounded-s-sm cursor-pointer"
          onClick={openSearch}
          aria-label="Search"
          title={searchLabel}
        >
          <Search className="size-7 sm:size-9 text-accent" aria-hidden="true" />
        </Button>
      </div>
    </>
  )
}

GenericSearchResponsive.displayName = "GenericSearchResponsive"