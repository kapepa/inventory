import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { Server, Socket } from 'socket.io';
import { parseCookies } from '@/shared/lib/parse-cookies';
import { COOKIE_KEYS } from '@/shared/constants/cookies';
import { verifyToken } from '@/shared/lib/auth';
import { handleConnection } from '@/features/websocket/model/connection-handler';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      credentials: true,
    },
    path: '/socket.io/',
  });

  // WebSocket connection handler
  io.on('connection', async (socket: Socket) => {
    const cookies = parseCookies(socket.handshake.headers.cookie);
    const jwtToken = cookies[COOKIE_KEYS.AUTH_TOKEN];

    if (!jwtToken) {
      console.log('Unauthenticated connection attempt:', socket.id);
      socket.disconnect();
      return;
    }

    const payload = await verifyToken(jwtToken);
    if (!payload) {
      console.log('Invalid JWT token:', socket.id);
      socket.disconnect();
      return;
    }

    handleConnection(io, socket, payload.userId);
  });

  // Store io in global for use in API routes
  global.io = io;

  httpServer
    .once('error', (err: Error) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.IO server is running`);
    });
});