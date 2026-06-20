import { NextRequest, NextResponse } from 'next/server';
import { authorizeRequest } from '@/features/server';
import { MiddlewareUser } from '@/features';

type Handler = (req: NextRequest, user: MiddlewareUser, context?: any) => Promise<NextResponse>;

export const apiHandler = (handler: Handler) => {
  return async (req: NextRequest, context?: any) => {
    try {
      // const authHeader = req.headers.get('authorization');
      // if (!authHeader) {
      //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      // }
      const user = await authorizeRequest({ email: 'admin@example.com' })

      if (!user) return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )


      // Execute handler
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