"client"

import dynamic from 'next/dynamic';
import { Loader } from '../ui/loader';

export const CalendarDynamic = dynamic(() => import('../ui/calendar').then(mod => ({ default: mod.Calendar })), {
  ssr: false,
  loading: () => <Loader />
});