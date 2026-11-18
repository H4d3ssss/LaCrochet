import { useEffect } from "react";
import AuthModal from "../AuthModal";

export default function CheckLogin({ showLogin, setShowLogin }) {
  useEffect(() => {
    if (!showLogin) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setShowLogin(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showLogin, setShowLogin]);

  if (!showLogin) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Account access"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-[2px] sm:p-8"
      onClick={(event) => {
        // Close only when the dark background itself is clicked,
        // not when the click happens inside the login/sign-up box.
        if (event.target === event.currentTarget) setShowLogin(false);
      }}
    >
      <AuthModal onClose={() => setShowLogin(false)} />
    </div>
  );
}
