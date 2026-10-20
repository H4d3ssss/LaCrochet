import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/auth/LoginForm";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <main></main>

      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setShowLogin(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Login"
            className="relative w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close login"
              className="absolute right-3 top-3 z-10"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>

            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}
