import type { Response } from 'express';

const isDevelopment = process.env.NODE_ENV === 'development';

export const AUTH_COOKIE_NAME = 'access_token';

const COOKIE_MAX_AGE = 60 * 60 * 1000; // 1 hour

const cookieOptions = {
  httpOnly: true,
  secure: !isDevelopment,
  sameSite: isDevelopment ? ('lax' as const) : ('strict' as const),
  path: '/',
};

export function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
}
