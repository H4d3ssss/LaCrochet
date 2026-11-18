import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignupForm";

export default function AuthModal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <SignUpForm onLogin={() => setIsSignUp(false)} onClose={onClose} />
  ) : (
    <LoginForm onSignUp={() => setIsSignUp(true)} onClose={onClose} />
  );
}