import { Router } from 'express';
import { getCurrentUser, login, register } from '../services/authService';
import { createAccessToken, verifyAccessToken } from '../utils/jwt';
import { AUTH_COOKIE_NAME, setAuthCookie, clearAuthCookie } from '../utils/authCookie';

const router = Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: 'Valid name, email, and password (minimum 8 characters) are required.',
      });
    }

    const user = await register(name.trim(), email.trim().toLowerCase(), password);

    const token = createAccessToken(user.id.toString());
    setAuthCookie(res, token);

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'A user with this email already exists.') {
      return res.status(409).json({ message: error.message });
    }

    console.error('Registration error:', error);

    return res.status(500).json({
      message: 'Registration failed. Please try again.',
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const user = await login(email.trim().toLowerCase(), password);

    const token = createAccessToken(user.id.toString());
    setAuthCookie(res, token);

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid email or password.') {
      return res.status(401).json({ message: error.message });
    }

    console.error('Login error:', error);

    return res.status(500).json({
      message: 'Login failed. Please try again.',
    });
  }
});

// CURRENT USER
router.get('/me', async (req, res) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      message: 'Not authenticated.',
    });
  }

  try {
    const payload = verifyAccessToken(token);

    if (!payload.sub) {
      clearAuthCookie(res);
      return res.status(401).json({
        message: 'Invalid session.',
      });
    }

    const user = await getCurrentUser(payload.sub);

    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({
        message: 'User no longer exists.',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    clearAuthCookie(res);

    return res.status(401).json({
      message: 'Invalid or expired session.',
    });
  }
});

// LOGOUT
router.post('/logout', (_req, res) => {
  clearAuthCookie(res);
  return res.sendStatus(204);
});

export default router;
