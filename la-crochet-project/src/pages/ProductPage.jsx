import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductPage() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
        <Navbar onLoginClick={() => setShowLogin(true)} />
        <main></main>
        <Footer /> 

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
    )
}