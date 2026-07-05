export const AUTH_CONFIG = {
  SALT_ROUNDS: 10,
  JWT_EXPIRES_IN: '7d',
  JWT_REFRESH_EXPIRES_IN: '30d',
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
} as const;