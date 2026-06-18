"use client"

import { useEffect } from "react";
import { cn, useRouter } from "../lib";
import { Button } from "./button";
import { Container } from "./container";
import { ROUTES } from "../constants";
import { useTranslations } from "next-intl";

interface ErrorBlockProps {
  error: Error & { digest?: string };
  reset?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export const ErrorBlock = ({ error, className, description, reset, title }: ErrorBlockProps) => {
  const router = useRouter()
  const t = useTranslations();

  useEffect(() => {
    console.error('Captured error:', error);
  }, [error]);

  return (
    <Container className={cn(
      "flex flex-col items-center justify-center min-h-[50vh] gap-4",
      className
    )}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex gap-4">
        {reset && (
          <Button onClick={() => reset()} variant="default" className="cursor-pointer py-4 px-5">
            {t("error-block.buttons.back")}
          </Button>
        )}
        <Button onClick={() => router.push(ROUTES.PARISHES)} variant="outline" className="cursor-pointer py-4 px-5">
          {t("error-block.buttons.home")}
        </Button>
      </div>
    </Container>
  )
}

ErrorBlock.displayName = "ErrorBlock"