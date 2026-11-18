import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { getDashboard } from "../../api/admin";
import AdminPageHeader, { LoadError } from "../../components/admin/AdminPageHeader";
import ProductImage from "../../components/ProductImage";
import { useAuth } from "../../context/AuthContext";
import { formatPrice } from "../../utils/format";
import { orderStatus } from "../../utils/orderStatus";

// The jobs waiting for the owner. Each box opens the list that needs attention.
const TO_DO = [
  {
    key: "to_prepare",
    label: "Ready to prepare",
    hint: "New orders you can start on",
    to: "/admin/orders?status=pending",
  },
  {
    key: "preparing",
    label: "Being prepared",
    hint: "Pack these and send them out",
    to: "/admin/orders?status=processing",
  },
  {
    key: "awaiting_payment",
    label: "Waiting for payment",
    hint: "Online payments not confirmed yet",
    to: "/admin/orders?status=pending",
  },
  {
    key: "low_stock",
    label: "Running low",
    hint: "Products with 5 or fewer left",
    to: "/admin/products?show=low",
  },
];

const shortDate = (isoDate) =>
  new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric" }).format(new Date(`${isoDate}T00:00:00`));

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function AdminDashboardPage() {
  const { token, user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setError("");
    getDashboard(token)
      .then(setData)
      .catch((err) => setError(err.message));
  }, [token]);

  useEffect(load, [load]);

  return (
    <>
      <AdminPageHeader
        title={`${greeting()}, ${user.first_name}`}
        description="Here's what needs doing and how the shop is selling."
      />

      {error ? (
        <LoadError message={error} onRetry={load} />
      ) : !data ? (
        <p className="py-16 text-center text-muted">Loading the dashboard…</p>
      ) : (
        <div className="space-y-6">
          <section aria-labelledby="todo-title">
            <h2 id="todo-title" className="sr-only">
              To do
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {TO_DO.map((item) => {
                const number = data.to_do[item.key];
                return (
                  <li key={item.key}>
                    <Link
                      to={item.to}
                      className="card flex h-full flex-col p-5 transition-colors hover:border-ink"
                    >
                      <span
                        className={`font-serif text-4xl font-semibold tabular-nums ${
                          number > 0 ? "text-berry" : "text-muted/60"
                        }`}
                      >
                        {number}
                      </span>
                      <span className="mt-2 font-bold">{item.label}</span>
                      <span className="text-sm text-muted">{number > 0 ? item.hint : "Nothing waiting"}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="sales-title" className="card p-5 sm:p-6">
            <h2 id="sales-title" className="text-xl font-semibold">
              Sales
            </h2>
            <p className="text-sm text-muted">Every order except cancelled ones, by the day it was placed.</p>

            <dl className="mt-5 grid grid-cols-3 divide-x divide-line">
              {[
                ["Today", data.sales.today],
                ["Last 7 days", data.sales.last_7_days],
                ["This month", data.sales.this_month],
              ].map(([label, figure]) => (
                <div key={label} className="px-3 first:pl-0 sm:px-6">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-1 text-lg font-bold tabular-nums sm:text-2xl">{formatPrice(figure.sales)}</dd>
                  <dd className="text-xs text-muted sm:text-sm">
                    {figure.orders} {figure.orders === 1 ? "order" : "orders"}
                  </dd>
                </div>
              ))}
            </dl>

            <SalesChart daily={data.daily} />
          </section>

          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <section aria-labelledby="recent-title" className="card p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="recent-title" className="text-xl font-semibold">
                  Latest orders
                </h2>
                <Link to="/admin/orders" className="link text-sm">
                  All orders
                </Link>
              </div>
              {data.recent_orders.length === 0 ? (
                <p className="mt-4 text-muted">No orders yet. They'll appear here as soon as customers check out.</p>
              ) : (
                <ul className="mt-3 divide-y divide-line">
                  {data.recent_orders.map((order) => {
                    const status = orderStatus(order.order_status);
                    return (
                      <li key={order.order_number}>
                        <Link
                          to={`/admin/orders?order=${encodeURIComponent(order.order_number)}`}
                          className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-sand/60"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-bold">{order.order_number}</p>
                            <p className="truncate text-sm text-muted">{order.customer_name}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${status.className}`}>
                            {status.label}
                          </span>
                          <span className="w-24 shrink-0 text-right font-semibold tabular-nums">
                            {formatPrice(order.total)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <div className="space-y-6">
              <section aria-labelledby="best-title" className="card p-5 sm:p-6">
                <h2 id="best-title" className="text-xl font-semibold">
                  Best sellers
                </h2>
                <p className="text-sm text-muted">Last 30 days</p>
                {data.best_sellers.length === 0 ? (
                  <p className="mt-4 text-muted">Nothing sold in the last 30 days yet.</p>
                ) : (
                  <ol className="mt-3 space-y-3">
                    {data.best_sellers.map((item, index) => (
                      <li key={`${item.product_id}-${item.name}`} className="flex items-center gap-3">
                        <span className="w-5 text-sm font-bold text-muted tabular-nums">{index + 1}</span>
                        <span className="min-w-0 flex-1 truncate font-semibold">{item.name}</span>
                        <span className="text-right text-sm tabular-nums">
                          {item.sold} sold
                          <span className="block text-xs text-muted">{formatPrice(item.sales)}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>

              <section aria-labelledby="low-title" className="card p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 id="low-title" className="text-xl font-semibold">
                    Running low
                  </h2>
                  {data.low_stock.length > 0 && (
                    <Link to="/admin/products?show=low" className="link text-sm">
                      Restock
                    </Link>
                  )}
                </div>
                {data.low_stock.length === 0 ? (
                  <p className="mt-3 text-muted">Everything on sale has more than 5 in stock.</p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {data.low_stock.map((product) => (
                      <li key={product.product_id} className="flex items-center gap-3">
                        <ProductImage
                          src={product.image_url}
                          alt=""
                          iconClassName="h-4 w-4"
                          className="h-9 w-9 shrink-0 rounded-lg"
                        />
                        <span className="min-w-0 flex-1 truncate font-semibold">{product.name}</span>
                        <span className={`text-sm font-bold tabular-nums ${product.stock_qty === 0 ? "text-berry" : ""}`}>
                          {product.stock_qty === 0 ? "Sold out" : `${product.stock_qty} left`}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 14 thin bars, one per day. Hover or tab onto a bar to see that day's numbers.
function SalesChart({ daily }) {
  const highest = Math.max(...daily.map((day) => day.sales));
  const hasSales = highest > 0;

  return (
    <figure className="mt-8">
      <figcaption className="mb-3 flex items-baseline justify-between text-sm">
        <span className="font-semibold">Daily sales, last 14 days</span>
        {hasSales && <span className="text-muted tabular-nums">Best day {formatPrice(highest)}</span>}
      </figcaption>

      <div className="relative h-40 border-b border-line">
        {/* one faint guide line at the top = the best day */}
        <div className="absolute inset-x-0 top-0 border-t border-dashed border-line" />
        <div className="absolute inset-0 flex items-end gap-0.5">
          {daily.map((day) => {
            const height = hasSales ? (day.sales / highest) * 100 : 0;
            return (
              <div
                key={day.date}
                tabIndex={0}
                role="img"
                aria-label={`${shortDate(day.date)}: ${formatPrice(day.sales)}, ${day.orders} ${day.orders === 1 ? "order" : "orders"}`}
                className="group relative flex h-full flex-1 items-end rounded-t-[4px]"
              >
                <div
                  className={`w-full rounded-t-[4px] transition-colors ${
                    day.sales > 0 ? "bg-berry group-hover:bg-berry-dark group-focus-visible:bg-berry-dark" : "bg-line"
                  }`}
                  style={{ height: day.sales > 0 ? `max(${height}%, 4px)` : "2px" }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs text-cream shadow-lg group-hover:block group-focus-visible:block">
                  <span className="block font-bold">{shortDate(day.date)}</span>
                  <span className="block tabular-nums">{formatPrice(day.sales)}</span>
                  <span className="block text-cream/70">
                    {day.orders} {day.orders === 1 ? "order" : "orders"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted" aria-hidden="true">
        <span>{shortDate(daily[0].date)}</span>
        <span>{shortDate(daily[7].date)}</span>
        <span>Today</span>
      </div>

    </figure>
  );
}
