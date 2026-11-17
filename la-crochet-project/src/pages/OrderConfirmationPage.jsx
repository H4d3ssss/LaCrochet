import { useState } from "react";
import { Link } from "react-router";
import CheckLogin from "../components/auth/CheckLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

// Temporary preview data; replace with the successful order response.
const order = {
  orderNumber: "LC-2026-0001",
  shippingMethod: "Home delivery",
  paymentMethod: "Cash on delivery",
  items: [
    { id: 1, name: "Dishie Yarn", price: 250, quantity: 1 },
    { id: 2, name: "Brava Worsted Yarn", price: 180, quantity: 2 },
  ],
  subtotal: 610,
  shipping: 90,
};

export default function OrderConfirmationPage() {
  const [showLogin, setShowLogin] = useState(false);
  const grandTotal = order.subtotal + order.shipping;

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-[#FFE6D9] px-4 py-12 text-[#3E302A] sm:px-6">
        <div className="mx-auto max-w-3xl">
          <section className="rounded-[24px] bg-white/80 p-6 text-center shadow-sm sm:p-10">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#A90000] text-3xl text-white"
            >
              ✓
            </div>

            <h1 className="font-lora text-3xl font-bold">
              Thank you for your order!
            </h1>
            <p className="mt-2 text-[#776B64]">
              Your order has been placed successfully.
            </p>
            <p className="mt-4 font-semibold">
              Order number: {order.orderNumber}
            </p>

            <div className="mt-8 border-t border-[#D9C9C0] pt-6 text-left">
              <h2 className="mb-4 font-lora text-xl font-bold">
                Order summary
              </h2>

              <div className="divide-y divide-[#E8DDD7]">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 py-3">
                    <span>
                      {item.name} <span className="text-[#776B64]">× {item.quantity}</span>
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <dl className="mt-4 space-y-3 border-t border-[#D9C9C0] pt-4 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>{formatPrice(order.shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-[#D9C9C0] pt-3 font-bold">
                  <dt>Grand total</dt>
                  <dd>{formatPrice(grandTotal)}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F7F1ED] p-4 text-left text-sm">
              <p>
                <span className="font-semibold">Delivery:</span>{" "}
                {order.shippingMethod}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethod}
              </p>
            </div>

            <Link
              to="/"
              className="mt-8 inline-block rounded-2xl bg-[#A90000] px-6 py-3 font-bold text-white hover:bg-[#870000]"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </main>

      <Footer />
      <CheckLogin showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
}