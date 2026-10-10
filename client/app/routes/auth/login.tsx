import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { ChangeEvent, SubmitEvent } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Invalid email or password."
        );
      }

      // Redirect after successful login
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    h-10 w-full rounded-lg border border-white/30
    bg-black/20 px-3 text-sm text-white
    outline-none transition-colors
    placeholder:text-white/40
    focus:border-emerald-400
    focus:ring-1 focus:ring-emerald-400/30
  `;

  const labelClass = "mb-1 block text-xs font-semibold text-white/90";

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>

        <p className="mt-1.5 text-xs leading-5 text-white/65">
          Log in to your SquadHub account
        </p>
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              className={`${inputClass} pr-16`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2
              -translate-y-1/2 text-xs font-semibold
              text-emerald-400 hover:text-emerald-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-400/30
            bg-red-500/10 px-3 py-2 text-xs text-red-300"
          >
            {error}
          </p>
        )}

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 h-10 w-full rounded-full
          bg-emerald-500 text-sm font-bold text-white
          transition-colors hover:bg-emerald-400
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      {/* Registration link */}
      <p className="mt-5 text-center text-xs text-white/65">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-emerald-400
          hover:text-emerald-300"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
