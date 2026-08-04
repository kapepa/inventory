import { HTMLAttributes } from "react"
import { Button } from "./button"
import { Menu } from "lucide-react"

interface MenuButtonProps extends HTMLAttributes<HTMLButtonElement> { }

export const MenuButton = ({ ...props }: MenuButtonProps) => {
  return (
    <Button
      asChild
      className="cursor-pointer size-11 rounded-full"
      variant="outline"
      {...props}
    >
      <Menu
        className="size-6 text-chart-3"
        strokeWidth={3}
        aria-hidden="true"
      />
    </Button>
  )
}

MenuButton.displayName = "MenuButton"