import { AUTH_CONFIG } from '@/shared/constants/auth';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key'
);

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const signToken = async (payload: JwtPayload): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(AUTH_CONFIG.JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
};

export const verifyToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    if (!token || token.trim() === '') return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  } catch (error) {
    // if (process.env.NODE_ENV === 'development') console.warn('JWT verification failed (expected in dev):', error);
    return null;
  }
};