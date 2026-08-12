export const ROUTES = {
  PARISHES: '/parishes',
  GROUPS: '/groups',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  USERS: '/users',
  SETTINGS: '/settings',
  ABOUT_US: '/about-us',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY: '/verify',
  NOT_FOUND: '/not-found',
  OFFLINE: '/offline'
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];