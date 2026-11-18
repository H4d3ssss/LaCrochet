import { useState } from "react";
import CheckLogin from "../components/auth/CheckLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import placeholder from "../assets/placeholder-img.jpg";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

// Temporary preview items for the page layout.
const previewItems = [
  {
    id: 1,
    name: "Dishie Yarn",
    price: 250,
    image: placeholder,
    quantity: 1,
  },
  {
    id: 2,
    name: "Brava Worsted Yarn",
    price: 180,
    image: placeholder,
    quantity: 2,
  },
];

const DELIVERY_FEE = 90; // Placeholder until the delivery API provides a quote.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function CheckoutPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { cartItems, subtotal } = useCart();

  // Use preview items until the cart has real items.
  const items = cartItems.length > 0 ? cartItems : previewItems;
  const orderSubtotal =
    cartItems.length > 0
      ? subtotal
      : previewItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

  const shippingFee = shippingMethod === "delivery" ? DELIVERY_FEE : 0;
  const grandTotal = orderSubtotal + shippingFee;

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (paymentMethod !== "online") {
      setSubmitError("Cash on delivery order submission is not connected yet.");
      return;
    }

    // Preview items are only for display; never create a payment for them.
    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty. Add products before paying online.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL.replace(/\/$/, "")}/api/payrex/checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Send IDs and quantities only. The backend loads prices from SQL.
          body: JSON.stringify({
            items: cartItems.map(({ id, quantity }) => ({ id, quantity })),
            shipping_method: shippingMethod,
          }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.detail || "Could not start PayRex checkout.");
      }

      if (!result.checkout_url) {
        throw new Error("The server did not return a PayRex checkout URL.");
      }

      window.location.assign(result.checkout_url);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while starting payment."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-[#FFE6D9] px-4 py-10 text-[#3E302A] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 font-lora text-4xl font-bold">Checkout</h1>

          <form
            onSubmit={handleSubmit}
            className="grid gap-8 lg:grid-cols-[1fr_380px]"
          >
            <div className="space-y-6">
              <section className="rounded-[24px] bg-white/80 p-6">
                <h2 className="mb-5 font-lora text-xl font-bold">
                  Contact information
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span>Full name</span>
                    <input
                      required
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      className="rounded-lg border border-[#D9C9C0] bg-white px-3 py-2"
                    />
                  </label>

                  <label className="grid gap-1">
                    <span>Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="rounded-lg border border-[#D9C9C0] bg-white px-3 py-2"
                    />
                  </label>

                  <label className="grid gap-1 sm:col-span-2">
                    <span>Phone number</span>
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className="rounded-lg border border-[#D9C9C0] bg-white px-3 py-2"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-[24px] bg-white/80 p-6">
                <h2 className="mb-5 font-lora text-xl font-bold">
                  Shipping method
                </h2>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D9C9C0] bg-white p-4">
                    <input
                      type="radio"
                      name="shipping"
                      value="delivery"
                      checked={shippingMethod === "delivery"}
                      onChange={() => setShippingMethod("delivery")}
                      className="accent-[#A90000]"
                    />
                    <span className="flex-1">Home delivery</span>
                    <span>{formatPrice(DELIVERY_FEE)}</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D9C9C0] bg-white p-4">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shippingMethod === "pickup"}
                      onChange={() => setShippingMethod("pickup")}
                      className="accent-[#A90000]"
                    />
                    <span className="flex-1">Store pickup</span>
                    <span>Free</span>
                  </label>
                </div>

                {shippingMethod === "delivery" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1 sm:col-span-2">
                      <span>Street address</span>
                      <input
                        required
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        className="rounded-lg border border-[#D9C9C0] bg-white px-3 py-2"
                      />
                    </label>

                    <label className="grid gap-1">
                      <span>City</span>
                      <input
                        required
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        className="rounded-lg border border-[#D9C9C0] bg-white px-3 py-2"
                      />
                    </label>

                    <label className="grid gap-1">
                      <span>Postal code</span>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        autoComplete="postal-code"
                        className="rounded-lg border border-[#D9C9C0] bg-white px-3 py-2"
                      />
                    </label>
                  </div>
                )}
              </section>

              <section className="rounded-[24px] bg-white/80 p-6">
                <h2 className="mb-5 font-lora text-xl font-bold">
                  Payment method
                </h2>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D9C9C0] bg-white p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#A90000]"
                    />
                    <span>Cash on delivery</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D9C9C0] bg-white p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="accent-[#A90000]"
                    />
                    <span>Online payment</span>
                  </label>
                </div>
              </section>
            </div>

            <aside className="h-fit rounded-[24px] bg-[#F7F1ED] p-6 shadow-sm">
              <h2 className="mb-5 font-lora text-xl font-bold">
                Order summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || placeholder}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl bg-white object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-[#776B64]">Qty: {item.quantity}</p>
                    </div>

                    <p className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <dl className="mt-6 space-y-3 border-t border-[#D9C9C0] pt-5 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(orderSubtotal)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>
                    {shippingMethod === "pickup"
                      ? "Free"
                      : formatPrice(shippingFee)}
                  </dd>
                </div>

                <div className="flex justify-between border-t border-[#D9C9C0] pt-3 font-bold">
                  <dt>Grand total</dt>
                  <dd>{formatPrice(grandTotal)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-2xl bg-[#A90000] px-5 py-3 font-bold text-white hover:bg-[#870000] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Redirecting to PayRex…"
                  : paymentMethod === "online"
                    ? `Pay online · ${formatPrice(grandTotal)}`
                    : `Place Order · ${formatPrice(grandTotal)}`}
              </button>

              {submitError && (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {submitError}
                </p>
              )}
            </aside>
          </form>
        </div>
      </main>

      <Footer />
      <CheckLogin showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
}