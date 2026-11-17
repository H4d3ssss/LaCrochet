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
        className="w-full max-w-sm space-y-5 rounded-2xl p-8 font-poppins bg-white"
      >
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            Login to <span className="font-serif text-3xl"
            >
              LaCrochet.
            </span>
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Sign in to your account.
          </p>
        </div>

        <div className="space-y-1">
          <div className="space-y-4">
            <div className="space-y-2">
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
                className="w-full rounded-lg border border-stone-300 px-4 py-2 outline-none focus:border-[#A90000] focus:ring-2 focus:ring-[#3F0000]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Password
              </label>

              <div className="flex flex-row items-center justify-between border rounded-lg border-stone-300 focus-within:border-[#A90000] focus-within:ring-2 focus-within:ring-[#3F0000]">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="px-4 py-2 outline-none flex-1 bg-transparent"
                />

                <a
                  className="px-4 py-2 text-sm font-medium text-[#A90000] hover:text-[#3F0000] shrink-0"
                  href="#"
                >
                  Forgot?
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-center items-center">
            <input id="remember-me" name="remember-me" type="checkbox" />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-stone-900"
            >
              Remember me
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#A90000] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#3F0000] cursor-pointer"
          >
            Sign in
          </button>

          <div className="flex items-center justify-center text-sm text-stone-400">
            <div className="h-px w-full bg-[#A90000] my-4" />
            <p className="px-4">or</p>
            <div className="h-px w-full bg-[#A90000] my-4" />
          </div>

          <SocialLogin />
        </div>

        <div className="text-xs text-center align-center">
          By logging in, you agree to LaCrochet's
          <a className="text-[#A90000]" href="#"> Terms of Service </a>
          &
          <a className="text-[#A90000]" href="#"> Privacy Policy</a>
        </div>
      </form>
    </>
  );
}
