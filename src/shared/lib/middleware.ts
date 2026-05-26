import { NextRequest, NextResponse } from 'next/server';

type Handler = (req: NextRequest, context?: any) => Promise<NextResponse>;

export const apiHandler = (handler: Handler) => {
  return async (req: NextRequest, context?: any) => {
    try {
      // Authentication check
      const authHeader = req.headers.get('authorization');
      // if (!authHeader) {
      //   return NextResponse.json(
      //     { error: 'Unauthorized' },
      //     { status: 401 }
      //   );
      // }

      // Rate limiting
      // CORS headers
      // Logging
      console.log(`${req.method} ${req.url}`);

      // Execute handler
      return await handler(req, context);
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
};