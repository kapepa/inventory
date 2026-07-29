"use client"

import { ProductStatusCounts } from "@/entities";
import { cn } from "@/shared";
import { ChartConfig, ChartContainer } from "@/shared/ui/chart";
import { useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface CategoryChartProps {
  className?: string;
  statusCounts: ProductStatusCounts
}

const chartConfig = {
  value: {
    label: "Status",
    color: "#709900",
  },
} satisfies ChartConfig

export const CategoryChart = ({ className, statusCounts }: CategoryChartProps) => {
  const t = useTranslations('category-chart');
  const chartData = [
    { status: t("free"), value: statusCounts.FREE, },
    { status: t("busy"), value: statusCounts.BUSY, },
    { status: t("repair"), value: statusCounts.REPAIR, },
  ]
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="status"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <Bar dataKey="value" fill="var(--color-value)" radius={4} />
        </BarChart>
      </ChartContainer>
      <p className="m-auto px-5 text-muted-foreground text-sm md:text-base text-center lg:text-left">
        {t("details", { total: statusCounts.total })}
      </p>
    </div>
  );
}

CategoryChart.displayName = "CategoryChart";