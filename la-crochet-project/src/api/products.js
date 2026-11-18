import { API_BASE_URL } from "./config";

async function get(path, notFoundMessage) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new Error("Could not reach the shop's server. Please check your connection and try again.");
  }
  if (response.status === 404) {
    const error = new Error(notFoundMessage ?? "Not found.");
    error.status = 404;
    throw error;
  }
  if (!response.ok) throw new Error("Something went wrong loading the shop. Please try again.");
  return response.json();
}

export const getProducts = () => get("/api/products");
export const getProduct = (id) => get(`/api/products/${id}`, "We couldn't find that product.");
export const getCategories = () => get("/api/categories");
