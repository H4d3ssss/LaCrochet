import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/auth/LoginForm";
import Carousel from "../components/landing-page/carousel";
import BestSellingYarns from "../components/landing-page/BestSellingYarns";
import NewYarns from "../components/landing-page/NewYarns";

import polyyarn from "../assets/landing-page-carousel/polyster-yarn.jpg";
import indoyarn from "../assets/landing-page-carousel/indophil-yarn.webp";
import yarn from "../assets/landing-page-carousel/yarn.jpg";


export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);

  const carouselSlides = [
    { src: polyyarn, alt: "Polyster Yarn" },
    { src: indoyarn, alt: "Indophil Yarn" },
    { src: yarn, alt: "yarn"},
  ];

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <main className="bg-[#FFE6D9] pb-15" >
        <Carousel slides={carouselSlides} autoPlayMs={4000} />

        <BestSellingYarns />
        <NewYarns />
      </main>

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
  );
}