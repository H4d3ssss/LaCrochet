import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CloseIcon } from "../Icons";

export default function LoginForm({ onSignUp, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password, rememberMe);
      onClose?.(); // logged in: close the popup
    } catch (err) {
      setError(err.message);
      setPassword("");
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card relative my-auto w-full max-w-sm space-y-5 p-8 shadow-xl shadow-ink/10"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted hover:bg-sand hover:text-ink"
        >
          <CloseIcon />
        </button>
      )}

      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Log in to your La Crochet account.</p>
      </div>

      <div>
        <label htmlFor="login-email" className="label">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="login-password" className="label">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="input pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            className="absolute inset-y-0 right-3 cursor-pointer text-xs font-bold text-muted hover:text-ink"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="checkbox"
        />
        Keep me logged in for 30 days
      </label>

      {error && (
        <p role="alert" className="alert-error">
          {error}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>

      <p className="text-center text-sm text-muted">
        New to La Crochet?{" "}
        <button type="button" onClick={onSignUp} className="link cursor-pointer">
          Create an account
        </button>
      </p>

      <p className="text-center text-xs text-muted">
        By logging in, you agree to our{" "}
        <a className="underline" href="/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{" "}
        and{" "}
        <a className="underline" href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
