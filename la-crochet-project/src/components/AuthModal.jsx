import { useState } from "react";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignupForm";
import { BagIcon } from "./Icons";

const TABS = [
  { id: "login", label: "Log in" },
  { id: "signup", label: "Create account" },
];

// Two tabs inside the popup: log in (the default) and create an account.
export default function AuthModal({ onClose, reason }) {
  const [tab, setTab] = useState("login");

  return (
    <div className="mx-auto max-w-md">
      <div role="tablist" aria-label="Account" className="flex rounded-full bg-sand p-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`auth-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`auth-panel-${item.id}`}
            onClick={() => setTab(item.id)}
            className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              tab === item.id ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {reason && (
        <p className="mt-5 flex items-center gap-2.5 rounded-xl bg-blush px-4 py-3 text-sm text-ink">
          <BagIcon className="h-5 w-5 shrink-0 text-berry" />
          Log in or create an account {reason}.
        </p>
      )}

      <div role="tabpanel" id={`auth-panel-${tab}`} aria-labelledby={`auth-tab-${tab}`} className="mt-7">
        {tab === "login" ? (
          <LoginForm onSignUp={() => setTab("signup")} onClose={onClose} />
        ) : (
          <SignUpForm onLogin={() => setTab("login")} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
