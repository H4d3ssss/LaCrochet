import { useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useFieldErrors } from "../../utils/fieldErrors";
import { AlertIcon, EyeIcon, EyeOffIcon } from "../Icons";

export default function LoginForm({ onSignUp, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showResetHelp, setShowResetHelp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const formRef = useRef(null);
  const passwordRef = useRef(null);

  useFieldErrors(formRef);

  // A wrong password is often just Caps Lock. Say so while they type.
  const checkCapsLock = (event) => setCapsLockOn(event.getModifierState?.("CapsLock") ?? false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email.trim(), password, rememberMe);
      onClose?.(); // logged in: close the popup
    } catch (err) {
      setError(err.message);
      setPassword("");
      setIsSubmitting(false);
      passwordRef.current?.focus(); // keep the email, try the password again
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-labelledby="login-title" className="space-y-5">
      <div>
        <h2 id="login-title" className="text-2xl font-semibold">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-muted">Log in with the email you signed up with.</p>
      </div>

      <div className="field">
        <label htmlFor="login-email" className="label">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          spellCheck={false}
          enterKeyHint="next"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          data-autofocus
          data-error="login-email-error"
          className="input py-3"
        />
        <p id="login-email-error" className="field-error">
          <AlertIcon className="h-4 w-4 shrink-0" />
          Please enter your email in this format: you@example.com
        </p>
      </div>

      <div className="field">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <label htmlFor="login-password" className="text-sm font-semibold text-ink">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowResetHelp((shown) => !shown)}
            aria-expanded={showResetHelp}
            aria-controls="login-reset-help"
            className="cursor-pointer text-xs font-semibold text-berry hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {showResetHelp && (
          <p id="login-reset-help" className="mb-2 rounded-xl bg-sand px-3.5 py-2.5 text-xs leading-relaxed text-ink">
            Password resets aren't automatic yet.{" "}
            <Link to="/contact" onClick={onClose} className="link">
              Message us
            </Link>{" "}
            with the email on your account and we'll help you get back in.
          </p>
        )}

        <div className="relative">
          <input
            ref={passwordRef}
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            enterKeyHint="go"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={checkCapsLock}
            onKeyUp={checkCapsLock}
            onBlur={() => setCapsLockOn(false)}
            required
            data-error="login-password-error"
            className="input py-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            aria-label="Show password"
            aria-pressed={showPassword}
            aria-controls="login-password"
            className="absolute inset-y-0 right-1.5 my-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-sand hover:text-ink"
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <p id="login-password-error" className="field-error">
          <AlertIcon className="h-4 w-4 shrink-0" />
          Please enter your password.
        </p>
        <p aria-live="polite" className="text-xs font-semibold text-ink empty:hidden">
          {capsLockOn && <span className="mt-1.5 block">Caps Lock is on.</span>}
        </p>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="checkbox"
        />
        Keep me logged in for 30 days
      </label>

      {error && (
        <p role="alert" className="alert-error flex gap-2">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-base">
        {isSubmitting && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden="true"
          />
        )}
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>

      <p data-announcer aria-live="polite" className="sr-only" />

      <p className="text-center text-sm text-muted">
        New to La Crochet?{" "}
        <button type="button" onClick={onSignUp} className="link cursor-pointer">
          Create an account
        </button>
      </p>
    </form>
  );
}
