import { Button, cn, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared"
import { Settings } from "lucide-react"

interface LoginButtonProps {
  className?: string
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={
            cn(
              "size-14 rounded-full bg-background cursor-pointer",
              "shadow-sm hover:shadow-md transition-shadow duration-300",
              className
            )}
        >
          <Settings strokeWidth={2} className="size-7 text-chart-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Профиль
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}