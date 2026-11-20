// server/src/app.ts — Express app (same pattern as HMS)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { authRouter } from './modules/auth/auth.routes.js';
import { roomsRouter } from './modules/rooms/rooms.routes.js';
import { menuRouter } from './modules/menu/menu.routes.js';

export const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// CORS
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : ['http://localhost:5173', 'http://localhost:4173', 'https://cafe87.vercel.app'];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const isLocal = origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');
    if (allowedOrigins.includes(origin) || (isLocal && process.env.NODE_ENV !== 'production')) {
      return cb(null, true);
    }
    cb(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 204,
}));

// Body parsers (15 MB for base64 image uploads)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'UP', service: 'cafe87-api', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/menu', menuRouter);

// 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

// Global error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('[unhandled]', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
