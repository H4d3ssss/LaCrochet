import "../../index.css";
import googleLogo from "../../assets/auth/SocialLogin-icons/google_logo.svg";
import facebookLogo from "../../assets/auth/SocialLogin-icons/facebook_logo.svg";
import appleLogo from "../../assets/auth/SocialLogin-icons/apple_logo.svg";

export default function SocialLogin() {
  return (
    <div class="flex flex-row space-x-2 justify-center">
      <button className="icon-button">
        <img class="w-6 h-6" src={googleLogo} alt="Google" />
      </button>
      <button className="icon-button bg-[#1877f2]">
        <img class="w-6 h-6" src={facebookLogo} alt="Facebook" />
      </button>
      <button className="icon-button bg-black/90">
        <img class="w-4 h-4 invert" src={appleLogo} alt="Apple" />
      </button>
    </div>
  );
}
