import { API_BASE_URL } from "./config";

// Remembers which order was just placed, so the confirmation page knows it's
// safe to empty the cart (and doesn't empty it for an old order link).
export const PENDING_ORDER_KEY = "lacrochet-pending-order";

async function readError(response, fallback) {
  try {
    const body = await response.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail) && body.detail.length > 0) {
      return String(body.detail[0].msg).replace(/^Value error, /, "");
    }
  } catch {
    // Not JSON; use the fallback message.
  }
  return fallback;
}

async function request(path, options, fallback) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error(
      "Could not reach the server. Please check your connection and try again."
    );
  }
  if (!response.ok) throw new Error(await readError(response, fallback));
  return response.json();
}

// Place an order. Resolves with { order_number, access_token, checkout_url }.
// If logged in, pass the token so the order is saved to their account.
export function createOrder(order, token) {
  return request(
    "/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(order),
    },
    "Could not place your order. Please try again."
  );
}

// Every order the logged-in customer has placed, newest first.
export function getMyOrders(token) {
  return request(
    "/api/orders",
    { headers: { Authorization: `Bearer ${token}` } },
    "Could not load your orders. Please try again."
  );
}

export function getOrder(orderNumber, token) {
  const query = new URLSearchParams({ token });
  return request(
    `/api/orders/${encodeURIComponent(orderNumber)}?${query}`,
    undefined,
    "We couldn't find that order."
  );
}

// Used when someone backs out of the PayRex payment page.
export function cancelOrder(orderNumber, token) {
  const query = new URLSearchParams({ token });
  return request(
    `/api/orders/${encodeURIComponent(orderNumber)}/cancel?${query}`,
    { method: "POST" },
    "Could not update the order."
  );
}
