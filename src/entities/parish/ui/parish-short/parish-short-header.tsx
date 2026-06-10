import { cn, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared";
import { CalendarDays, Info, LucideIcon, NotebookTabs } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface ParishShortHeaderProps {
  className?: string;
}

type HintItem = {
  text: string;
  icon: LucideIcon;
};

export const ParishShortHeader =
  ({ className }: ParishShortHeaderProps) => {
    const t = useTranslations('groups.parish-short-header');

    const listOfHint: HintItem[] = useMemo(() => [
      { text: t("names-desc"), icon: NotebookTabs },
      { text: t("total-number"), icon: Info },
      { text: t("date"), icon: CalendarDays },
    ], [t]);

    return (
      <div className={cn(
        "px-2 py-3 border rounded-md bg-card grid grid-cols-[1fr_1fr_2fr] items-center text-sm font-bold text-muted-foreground", className
      )}>
        {listOfHint.map(({ text, icon: Icon }) => (
          <div key={text} className="flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon className="text-accent" aria-label={text} />
              </TooltipTrigger>
              <TooltipContent className={cn("bg-chart-2", "border-chart-2")}>
                <TooltipText>
                  {text}
                </TooltipText>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    );
  }

ParishShortHeader.displayName = 'ParishShortHeader';