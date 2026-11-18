import { API_BASE_URL } from "./config";

export async function subscribeToNewsletter(email) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  if (!response.ok) {
    let message = "Could not sign you up. Please check your email and try again.";
    try {
      const body = await response.json();
      if (typeof body.detail === "string") message = body.detail;
      else if (Array.isArray(body.detail)) {
        message = String(body.detail[0].msg).replace(/^Value error, /, "");
      }
    } catch {
      // keep the general message
    }
    throw new Error(message);
  }
  return response.json();
}
