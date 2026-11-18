import { API_BASE_URL } from "./config";

// Every cart request sends the login token, so the server knows whose cart it is.
async function request(path, token, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  if (!response.ok) {
    let message = "Something went wrong with your cart. Please try again.";
    try {
      const body = await response.json();
      if (typeof body.detail === "string") message = body.detail;
    } catch {
      // Not JSON; keep the general message.
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  // Every cart route answers with the whole, up-to-date cart.
  return response.json();
}

export const getCart = (token) => request("/api/cart", token);

export const addCartItem = (token, productId, quantity) =>
  request("/api/cart/items", token, {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  });

export const setCartItemQuantity = (token, productId, quantity) =>
  request(`/api/cart/items/${productId}`, token, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });

export const removeCartItem = (token, productId) =>
  request(`/api/cart/items/${productId}`, token, { method: "DELETE" });

export const emptyCart = (token) => request("/api/cart", token, { method: "DELETE" });
