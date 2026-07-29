import dynamic from 'next/dynamic';

export const CalendarDynamic = dynamic(() => import('./calendar').then(mod => ({ default: mod.Calendar })), {
  ssr: false,
  loading: () => <div>Loading...</div>
});