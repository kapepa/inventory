import { AUTH_CONFIG } from '@/shared/constants';
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
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};