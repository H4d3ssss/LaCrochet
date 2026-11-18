import { Link } from "react-router";
import LoginRequired from "../components/auth/LoginRequired";
import { BagIcon, CloseIcon } from "../components/Icons";
import PageLayout from "../components/PageLayout";
import ProductImage from "../components/ProductImage";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export default function Cart() {
  const { cartItems, cartCount, subtotal, isLoading, cartError, changeQuantity, removeFromCart } =
    useCart();
  const { user } = useAuth();
  const hasAvailableItems = cartItems.some((item) => item.available);

  return (
    <PageLayout width="wide">
      <h1 className="page-title">Your cart</h1>

      {user && cartError && (
        <p role="alert" className="alert-error mt-6">
          {cartError}
        </p>
      )}

      <div className="mt-8">
        {!user ? (
          <LoginRequired
            title="Log in to see your cart"
            message="Your cart is saved to your account, so it's there on any device."
          />
        ) : isLoading && cartItems.length === 0 ? (
          <p className="py-16 text-center text-muted">Loading your cart…</p>
        ) : cartItems.length === 0 ? (
          <div className="card px-6 py-14 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush text-berry">
              <BagIcon />
            </span>
            <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted">Find something handmade to fill it.</p>
            <Link to="/catalog" className="btn-primary mt-6">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <ul className="card divide-y divide-line">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 p-4 sm:p-5">
                  <Link
                    to={`/products/${item.id}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-28 sm:w-28"
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      dimmed={!item.available}
                      className="h-full w-full"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="font-sans font-semibold">
                          <Link to={`/products/${item.id}`} className="hover:text-berry">
                            {item.name}
                          </Link>
                        </h2>
                        <p className="text-sm text-muted">{formatPrice(item.price)} each</p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                        className="cursor-pointer rounded-full p-1.5 text-muted hover:bg-sand hover:text-berry"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {!item.available ? (
                      <p className="mt-1 text-sm font-semibold text-berry">
                        No longer available. Remove it to check out.
                      </p>
                    ) : item.quantity > item.stockQty ? (
                      <p className="mt-1 text-sm font-semibold text-berry">
                        Only {item.stockQty} left. Lower the quantity to check out.
                      </p>
                    ) : (
                      item.stockQty <= 5 && (
                        <p className="mt-1 text-sm text-muted">Only {item.stockQty} left</p>
                      )
                    )}

                    <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                      <div
                        className="inline-flex items-center rounded-full border border-line"
                        role="group"
                        aria-label={`Quantity of ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          disabled={item.quantity <= 1}
                          onClick={() => changeQuantity(item.id, -1)}
                          className="h-9 w-9 cursor-pointer rounded-full hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          disabled={!item.available || item.quantity >= item.stockQty}
                          onClick={() => changeQuantity(item.id, 1)}
                          className="h-9 w-9 cursor-pointer rounded-full hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Shipping is chosen at checkout, so the cart only shows the subtotal. */}
            <aside className="card p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-semibold">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-base font-bold">
                  <dt>
                    Subtotal{" "}
                    <span className="font-normal text-muted">
                      ({cartCount} {cartCount === 1 ? "item" : "items"})
                    </span>
                  </dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <p className="text-muted">Delivery or pickup is chosen at checkout.</p>
              </dl>

              {hasAvailableItems ? (
                <Link to="/checkout" className="btn-primary mt-6 w-full">
                  Go to checkout
                </Link>
              ) : (
                <p className="mt-6 text-sm text-muted">
                  None of these items can be bought right now.
                </p>
              )}
              <Link to="/catalog" className="btn-quiet mt-2 w-full">
                Keep shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
