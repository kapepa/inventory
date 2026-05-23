import { useState, useEffect } from 'react';

interface LiveTime {
  time: string;
  date: string;
  dayOfWeek: string;
}

export const useLiveTime = () => {
  const [liveTime, setLiveTime] = useState<LiveTime | null>(null);

  useEffect(() => {
    setLiveTime(getCurrentTime());

    const interval = setInterval(() => {
      setLiveTime(getCurrentTime());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return liveTime;
};

function getCurrentTime(): LiveTime {
  const now = new Date();

  const time = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const dayOfWeek = now.toLocaleDateString('ru-RU', {
    weekday: 'long',
  });

  const formattedDate = date
    .replace(' г.', '')
    .replace(
      /(\d{2}) (\S+) (\d{4})/,
      (_, day, month, year) =>
        `${day} ${month[0].toUpperCase() + month.slice(1) + "."} ${year}`
    );

  const formattedDayOfWeek = dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1);

  return { time, date: formattedDate, dayOfWeek: formattedDayOfWeek };
}