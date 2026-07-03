import { NextRequest, NextResponse } from 'next/server';
import { authorizeRequest } from '@/features/server';
import { MiddlewareUser } from '@/features';
import { getAuthToken, verifyToken } from './auth';

type Handler = (req: NextRequest, user: MiddlewareUser, context?: any) => Promise<NextResponse>;

export const apiHandler = (handler: Handler) => {
  return async (req: NextRequest, context?: any) => {
    try {
      // Retrieve the token from the cookies
      const token = getAuthToken(req);

      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized: No token provided' },
          { status: 401 }
        );
      }

      // Verify the token
      const payload = verifyToken(token);

      if (!payload) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid token' },
          { status: 401 }
        );
      }

      // Retrieving user data from the database
      const user = await authorizeRequest({ id: payload.userId, email: payload.email });

      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized: User not found' },
          { status: 401 }
        );
      }

      // Execute the handler with the user's data
      return await handler(req, user, context);
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
};