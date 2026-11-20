// server/src/middleware/requireAdmin.ts
import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth.js';

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const payload = verifyToken(token);
    (req as any).admin = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
