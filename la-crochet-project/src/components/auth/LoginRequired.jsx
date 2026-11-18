import { useAuth } from "../../context/AuthContext";
import { UserIcon } from "../Icons";

// Shown on Cart, Checkout and My orders when nobody is logged in.
export default function LoginRequired({ title, message }) {
  const { isChecking, requestLogin } = useAuth();

  if (isChecking) {
    return <p className="py-16 text-center text-muted">Loading…</p>;
  }

  return (
    <div className="card px-6 py-14 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush text-berry">
        <UserIcon />
      </span>
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-muted">{message}</p>
      <button type="button" onClick={() => requestLogin()} className="btn-primary mt-6">
        Log in or create an account
      </button>
    </div>
  );
}
