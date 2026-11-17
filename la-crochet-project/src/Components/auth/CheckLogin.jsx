import LoginForm from "./LoginForm";

export default function CheckLogin({ showLogin, setShowLogin }) {
  return (
    showLogin && (
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
    )
  );
}