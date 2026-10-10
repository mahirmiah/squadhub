import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { ChangeEvent, SubmitEvent } from "react";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Unable to create your account."
        );
      }

      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
        <h2 className="text-2xl font-bold tracking-tight text-center">
          Register
        </h2>

        <p className="mt-1.5 text-xs leading-5 text-center text-white/65">
          Join your squad and take your game to the next level.
        </p>
      </div>

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

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

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-400/30
            bg-red-500/10 px-3 py-2 text-xs text-red-300"
          >
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 h-10 w-full rounded-full
          bg-emerald-500 text-sm font-bold text-white
          transition-colors hover:bg-emerald-400
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {/* Login link */}
      <p className="mt-5 text-center text-xs text-white/65">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-emerald-400
          hover:text-emerald-300"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
