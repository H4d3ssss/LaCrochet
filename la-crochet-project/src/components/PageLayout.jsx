import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CheckLogin from "./auth/CheckLogin";

// Navbar + page content + Footer + login popup, so pages don't repeat it.
// width: "narrow" for reading pages, "wide" for shopping pages.
export default function PageLayout({ children, width = "narrow" }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <main
        className={`mx-auto min-h-[60vh] px-4 pt-8 pb-8 sm:px-6 sm:pt-12 lg:px-8 ${
          width === "wide" ? "max-w-7xl" : "max-w-3xl"
        }`}
      >
        {children}
      </main>
      <Footer />
      <CheckLogin showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
}
