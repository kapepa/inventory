"use client"

import { useRouter } from "@/shared/lib/i18n/routing";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export default function OfflinePage() {
  const t = useTranslations('offline');
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Автоматически возвращаемся назад при восстановлении связи
      router.back();
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [router]);

  const handleRetry = useCallback(() => {
    if (isOnline) {
      // Если online - возвращаемся на предыдущую страницу
      router.back();
    }
    // Если offline - кнопка неактивна, ничего не делаем
  }, [isOnline, router]);

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen py-16">
      <WifiOff className="w-24 h-24 text-muted-foreground mb-8" />
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-muted-foreground text-center max-w-md mb-8">
        {t('description')}
      </p>
      <Button
        onClick={handleRetry}
        disabled={!isOnline}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isOnline ? t('retry') : t('waiting')}
      </Button>
      {!isOnline && (
        <p className="text-sm text-muted-foreground mt-4">
          {t('checkConnection')}
        </p>
      )}
    </Container>
  );
}