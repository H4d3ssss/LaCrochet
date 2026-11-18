import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

const DELIVERY_FEE = 90; // Placeholder until the delivery API provides a quote.

export default function Cart() {
  const [shippingMethod, setShippingMethod] = useState("pickup");

  const {
    cartItems,
    subtotal,
    setQuantity,
    removeItem,
    isLoading,
  } = useCart();

  const shippingFee = shippingMethod === "delivery" ? DELIVERY_FEE : 0;
  const grandTotal = subtotal + shippingFee;

  return (
    <>

      <main className="min-h-screen bg-[#FFE6D9] px-4 py-10 text-[#3E302A] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 font-lora text-4xl font-bold">My Cart</h1>

          {isLoading ? (
            <p className="py-10 text-center">Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <div className="rounded-2xl bg-white/80 p-10 text-center">
              <h2 className="font-lora text-2xl font-semibold">
                Your cart is empty
              </h2>
            </div>
          ) : (
            <>
              <div className="mb-3 hidden grid-cols-[minmax(0,1fr)_120px_150px_120px_32px] border-b border-[#D9C9C0] px-2 pb-3 text-sm uppercase text-[#776B64] md:grid">
                <span>Product</span>
                <span>Price</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
                <span />
              </div>

              <div className="divide-y divide-[#D9C9C0]">
                {cartItems.map((item) => (
                  <article
                    key={item.productId}
                    className="grid grid-cols-2 gap-4 py-5 md:grid-cols-[minmax(0,1fr)_120px_150px_120px_32px] md:items-center"
                  >
                    <div className="col-span-2 flex items-center gap-4 md:col-span-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-20 shrink-0 rounded-lg bg-white object-cover sm:h-24 sm:w-24"
                      />
                      <h2 className="font-lora text-lg font-semibold">
                        {item.product.name}
                      </h2>
                    </div>

                    <div>
                      <span className="text-sm text-[#776B64] md:hidden">
                        Price
                      </span>
                      <p>{formatPrice(item.product.price)}</p>
                    </div>

                    <div>
                      <span className="text-sm text-[#776B64] md:hidden">
                        Quantity
                      </span>
                      <div className="mt-1 flex w-fit items-center rounded-full border border-[#CBB8AC] bg-white">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.product.name} quantity`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          className="px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${item.product.name} quantity`}
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-[#776B64] md:hidden">
                        Total
                      </span>
                      <p className="font-semibold md:text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.product.name}`}
                      onClick={() => removeItem(item.productId)}
                      className="self-center text-xl text-[#776B64] hover:text-[#A90000]"
                    >
                      ×
                    </button>
                  </article>
                ))}
              </div>

              <section className="mt-8 grid gap-8 rounded-2xl bg-[#F7F1ED] p-6 shadow-sm md:grid-cols-[1fr_280px] md:p-8">
                <div>
                  <h2 className="mb-4 font-lora text-xl font-bold">
                    Choose shipping mode
                  </h2>

                  <label className="mb-4 flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "pickup"}
                      onChange={() => setShippingMethod("pickup")}
                      className="accent-[#A90000]"
                    />
                    <span>Store pickup</span>
                    <span className="font-bold">FREE</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "delivery"}
                      onChange={() => setShippingMethod("delivery")}
                      className="accent-[#A90000]"
                    />
                    <span>Delivery</span>
                    <span className="text-sm text-[#776B64]">
                      {formatPrice(DELIVERY_FEE)}
                    </span>
                  </label>
                </div>

                <div>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(subtotal)}</dd>
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

                  <a
                    href="/checkout"
                    className="mt-5 flex items-center justify-between rounded-[16px] bg-[#A90000] px-5 py-3 font-bold text-white hover:bg-[#870000]"
                  >
                    <span>Checkout</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </a>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}