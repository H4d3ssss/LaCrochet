import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckLogin from "../components/auth/CheckLogin";
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

      <CheckLogin showLogin={showLogin} setShowLogin={setShowLogin}/>
    </>
  );
}