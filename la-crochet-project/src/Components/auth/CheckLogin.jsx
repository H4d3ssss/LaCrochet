import AuthModal from "../AuthModal";

export default function CheckLogin({ showLogin, setShowLogin }) {
  if (!showLogin) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/30 p-4 backdrop-blur-[3px]"
      onClick={() => setShowLogin(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account access"
        className="relative my-auto w-full max-w-sm"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 z-10 cursor-pointer"
          onClick={() => setShowLogin(false)}
        >
          ✕
        </button>

        <AuthModal />
      </div>
    </div>
  );
}