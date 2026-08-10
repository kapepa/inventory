import { ProductStatusCounts } from "@/entities/product/model/types";
import { AppLocale } from "@/shared/lib/i18n/config";
import { cn } from "@/shared/lib/utils";
import { getTranslations } from "next-intl/server";

interface CategoryChartProps {
  locale: AppLocale;
  className?: string;
  statusCounts: ProductStatusCounts;
}

export const CategoryChart = async ({ className, statusCounts, locale }: CategoryChartProps) => {
  const t = await getTranslations({ locale, namespace: 'category-chart' });

  const data = [
    { label: t("free"), value: statusCounts.FREE, color: "#10b981" },
    { label: t("busy"), value: statusCounts.BUSY, color: "#f59e0b" },
    { label: t("repair"), value: statusCounts.REPAIR, color: "#ef4444" },
  ];

  const max = Math.max(statusCounts.FREE, statusCounts.BUSY, statusCounts.REPAIR, 1);

  const barWidth = 50;
  const gap = 30;
  const chartHeight = 150;
  const padding = 10;
  const labelHeight = 20;
  const totalHeight = chartHeight + padding + labelHeight + 5;
  const totalWidth = data.length * barWidth + (data.length - 1) * gap + padding * 2;


  return (
    <div className={cn("flex flex-col gap-y-2 h-full max-w-150", className)}>
      <div className="w-full flex justify-center items-center">
        <svg
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="w-full h-full max-w-100"
          preserveAspectRatio="xMidYMid meet"
        >
          {data.map((item, idx) => {
            const barHeight = (item.value / max) * chartHeight;
            const x = padding + idx * (barWidth + gap);
            const y = chartHeight - barHeight + padding;

            return (
              <g key={item.label}>
                {/* Бар */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color}
                  rx={4}
                />
                {/* Text */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + padding + 15}
                  textAnchor="middle"
                  className="text-xs fill-muted-foreground"
                >
                  {item.label}
                </text>
                {/* Value */}
                <text
                  x={x + barWidth / 2}
                  y={barHeight + y - 5}
                  textAnchor="middle"
                  className="text-xs font-medium fill-foreground text-foreground"
                >
                  {item.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="m-auto px-5 text-muted-foreground text-sm md:text-base text-center lg:text-left">
        {t("details", { total: statusCounts.total })}
      </p>
    </div>
  );
};