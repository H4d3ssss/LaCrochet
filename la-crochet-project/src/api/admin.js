import { API_BASE_URL } from "./config";

async function request(path, token, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/admin${path}`, {
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
    let message = "Something went wrong. Please try again.";
    try {
      const body = await response.json();
      if (typeof body.detail === "string") message = body.detail;
      else if (Array.isArray(body.detail) && body.detail.length > 0) {
        const first = body.detail[0];
        const field = first.loc?.[first.loc.length - 1];
        message = `${field ? `${field.replace("_", " ")}: ` : ""}${String(first.msg).replace(/^Value error, /, "")}`;
      }
    } catch {
      // keep the general message
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
}

export const getAllOrders = (token) => request("/orders", token);

export const updateOrder = (token, orderNumber, changes) =>
  request(`/orders/${encodeURIComponent(orderNumber)}`, token, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });

export const getAllProducts = (token) => request("/products", token);

export const createProduct = (token, product) =>
  request("/products", token, { method: "POST", body: JSON.stringify(product) });

export const updateProduct = (token, productId, changes) =>
  request(`/products/${productId}`, token, { method: "PATCH", body: JSON.stringify(changes) });

// ---- Back office ----
export const getCounts = (token) => request("/counts", token);
export const getDashboard = (token) => request("/dashboard", token);

export const getAdminCategories = (token) => request("/categories", token);

export const createCategory = (token, category) =>
  request("/categories", token, { method: "POST", body: JSON.stringify(category) });

export const updateCategory = (token, categoryId, changes) =>
  request(`/categories/${categoryId}`, token, { method: "PATCH", body: JSON.stringify(changes) });

export const reorderCategories = (token, categoryIds) =>
  request("/categories/order", token, {
    method: "PUT",
    body: JSON.stringify({ category_ids: categoryIds }),
  });

export const deleteCategory = (token, categoryId) =>
  request(`/categories/${categoryId}`, token, { method: "DELETE" });

export const getSubscribers = (token) => request("/newsletter", token);

export const unsubscribe = (token, subscriberId) =>
  request(`/newsletter/${subscriberId}`, token, { method: "DELETE" });
