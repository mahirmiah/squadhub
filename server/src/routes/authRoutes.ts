import { Router } from "express";
import { login, register } from "../services/authService";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};

    // Validate registration input
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 8
    ) {
      return res.status(400).json({
        message:
          "Valid name, email, and password (minimum 8 characters) are required.",
      });
    }

    // Create user
    const user = await register(
      name.trim(),
      email.trim().toLowerCase(),
      password
    );

    return res.status(201).json(user);
  } catch (error) {
    // Duplicate email
    if (
      error instanceof Error &&
      error.message === "A user with this email already exists."
    ) {
      return res.status(409).json({
        message: error.message,
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    // Validate login input
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    // Verify credentials
    const user = await login(email.trim().toLowerCase(), password);

    return res.status(200).json(user);
  } catch (error) {
    // Incorrect credentials
    if (
      error instanceof Error &&
      error.message === "Invalid email or password."
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});

export default router;
