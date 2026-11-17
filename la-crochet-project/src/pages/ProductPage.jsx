import { useState } from "react";
import CheckLogin from "../components/auth/CheckLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// PLACEHOLDER IMAGE
import placeholder from "../assets/placeholder-img.jpg";

export default function ProductPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [quantity, setQuantity] = useState(1);

    return (
        <>
        <Navbar onLoginClick={() => setShowLogin(true)} />
        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:w-1/2">
            <img
            src={placeholder}
            alt="placeholder image"
            className="aspect-square w-full rounded-lg object-cover"
            />
        </div>

        <section className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold">Product Name</h1>
            <p className="mt-3 text-2xl">₱00.00</p>

            <div className="mt-6">
            <span className="block">Quantity</span>

            <div
                className="mt-2 inline-flex items-center rounded border"
                role="group"
                aria-label="Quantity"
            >
                <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="px-4 py-2 hover:bg-gray-100"
                >
                −
                </button>

                <span className="min-w-10 text-center" aria-live="polite">
                {quantity}
                </span>

                <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
                className="px-4 py-2 hover:bg-gray-100"
                >
                +
                </button>
            </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="rounded bg-[#A90000] px-5 py-3 text-[#FFE6D9] cursor-pointer hover:bg-[#3F0000]">
                Add to Cart
            </button>
            <button type="button" className="rounded border border-[#A90000] px-5 py-3 cursor-pointer hover:bg-[#3F0000] hover:text-[#FFE6D9]">
                Buy Now
            </button>
            </div>

            <div className="mt-8">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum mi vitae massa tempor tempor ac ut diam. Proin pellentesque.</p>
            </div>
        </section>
        </main>
        <Footer />

        <CheckLogin showLogin={showLogin} setShowLogin={setShowLogin}/>
        </>
    )
}