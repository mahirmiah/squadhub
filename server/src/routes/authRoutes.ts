import express from 'express';
import { login, register } from '../services/authService';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await register(name, email, password);

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error instanceof Error ? error.message : 'Registration failed.',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login(email, password);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: error instanceof Error ? error.message : 'Login failed.',
    });
  }
});

export default router;
