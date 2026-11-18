import CheckLogin from "./CheckLogin";
import { useAuth } from "../../context/AuthContext";

// The login popup opened by requestLogin() — e.g. a guest clicking "Add to Cart".
export default function LoginPrompt() {
  const { loginPromptOpen, closeLoginPrompt } = useAuth();

  return (
    <CheckLogin
      showLogin={loginPromptOpen}
      setShowLogin={(open) => {
        if (!open) closeLoginPrompt();
      }}
    />
  );
}
