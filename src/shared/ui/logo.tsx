import Image from "next/image";
import { ROUTES } from "../constants/routes";
import { Link } from "../lib/i18n/routing";

export const Logo =
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
            width={64}
            height={64}
            priority
            fetchPriority="high"
            className="object-contain w-full h-full"
          />
        </div>
        <span className="font-bold  text-base md:text-lg text-accent">
          INVENTORY
        </span>
      </Link>
    );
  }
