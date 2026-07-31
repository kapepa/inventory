import Image from "next/image";
import { memo } from "react";
import { ROUTES } from "../constants";
import { Link } from "../lib/i18n/routing";

export const Logo = memo(
  () => {
    return (
      <Link
        href={ROUTES.PARISHES}
        className="flex items-center gap-x-2 md:gap-x-5"
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image
            src="/svgs/shield-user.svg"
            alt="Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <span className="font-bold  text-base md:text-lg text-accent">
          INVENTORY
        </span>
      </Link>
    );
  }
)