// server/src/lib/auth.ts — JWT helpers
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'cafe87-dev-secret-change-in-prod';
const JWT_EXPIRES = '24h';

export function signToken(payload: { adminId: number; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token: string): { adminId: number; email: string } {
  return jwt.verify(token, JWT_SECRET) as { adminId: number; email: string };
}
