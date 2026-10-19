import { useState } from "react";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Connect this to FastAPI later.
  }

  return (

    <>
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-md"
    >
      <div>
        <h1 className="text-2xl font-bold text-stone-800">
          Welcome to Le Crochet
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Sign in to your account.
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        />
      </div>

      <SocialLogin />

      <button
        type="submit"
        className="w-full rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
      >
        Sign in
      </button>
    </form>
      
    </>

  );
}