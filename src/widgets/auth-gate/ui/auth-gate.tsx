import { cn } from "@/shared/lib/utils";
import { Button, Skeleton } from "@/shared/ui";
import { AppLocale } from "@/shared/lib/i18n/config";
import { getTranslations } from "next-intl/server";
import { Link } from "@/shared/lib/i18n/routing";
import { ROUTES } from "@/shared/constants/routes";

type ActiveTabType = typeof ROUTES.REGISTER | typeof ROUTES.LOGIN;

interface AuthGateProps {
  activeTab: ActiveTabType;
  className?: string;
  locale: AppLocale;
  children?: React.ReactNode;
}

export const AuthGate = async ({ activeTab, className, locale, children }: AuthGateProps) => {
  const t = await getTranslations({ locale, namespace: 'auth-gate' });

  return (
    <div className={cn("w-full max-w-md mx-auto bg-card rounded-lg shadow-lg overflow-hidden", className)}>
      <div className="grid w-full grid-cols-2 p-6 gap-x-2">
        <Link href={ROUTES.LOGIN} locale={locale} className="w-full">
          <Button
            type="button"
            variant="outline"
            className={cn(
              "p-1 rounded-sm w-full",
              activeTab === ROUTES.LOGIN ? "bg-accent-custom text-primary-foreground" : "cursor-pointer"
            )}
          >
            {t("login")}
          </Button>
        </Link>
        <Link href={ROUTES.REGISTER} locale={locale} className="w-full" >
          <Button
            type="button"
            variant="outline"
            className={cn(
              "p-1 rounded-sm w-full",
              activeTab === ROUTES.REGISTER ? "bg-accent-custom text-primary-foreground" : "cursor-pointer"
            )}
          >
            {t("register")}
          </Button>
        </Link>
      </div>
      {children}
    </div>
  )
}

AuthGate.displayName = "AuthGate"

export const AuthGateSkeleton = async ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("w-full max-w-md mx-auto bg-card rounded-lg shadow-lg overflow-hidden", className)}>
      <div className="grid w-full grid-cols-2 p-6 gap-x-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      {children}
    </div>
  )
}

AuthGateSkeleton.displayName = "AuthGateSkeleton"