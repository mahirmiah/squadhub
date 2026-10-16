import jwt, { type Secret, type JwtPayload } from 'jsonwebtoken';

const jwtSecret: Secret = process.env.JWT_SECRET ?? '';

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required.');
}

export function createAccessToken(userId: string): string {
  return jwt.sign({}, jwtSecret, {
    subject: userId,
    expiresIn: '1h',
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  const payload = jwt.verify(token, jwtSecret);

  if (typeof payload === 'string' || !payload.sub) {
    throw new Error('Invalid token payload.');
  }

  return payload;
}
