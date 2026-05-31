import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { ROUTES } from "../constants";

export const Logo = memo(
  () => {
    return (
      <Link
        href={ROUTES.PARISHES}
        className="flex items-center gap-x-2 md:gap-x-5"
      >
        <div className="relative w-16 h-16">
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