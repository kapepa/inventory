"use client"

import { useLocale } from "next-intl";
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import type { Locale } from "date-fns";

interface LiveTime {
  time: string;
  date: string;
  dayOfWeek: string;
}

const LOCALES_MAP: Record<string, Locale> = {
  ru: ru,
  en: enUS,
};

export const useLiveTime = () => {
  const locale = useLocale();
  const [liveTime, setLiveTime] = useState<LiveTime | null>(null);

  useEffect(() => {
    setLiveTime(getCurrentTime(locale));

    const interval = setInterval(() => {
      setLiveTime(getCurrentTime(locale));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return liveTime;
};

function getCurrentTime(localeCode: string): LiveTime {
  const now = new Date();
  const dateFnsLocale = LOCALES_MAP[localeCode] || enUS;
  const time = format(now, 'HH:mm');
  const date = format(now, 'd MMM yyyy', { locale: dateFnsLocale });
  const dayOfWeek = format(now, 'EEEE', { locale: dateFnsLocale });
  const formattedDayOfWeek = dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1);

  return { time, date, dayOfWeek: formattedDayOfWeek };
}