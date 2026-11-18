const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const GENERIC_ERROR = "Could not create your account. Please try again.";

async function readError(response) {
  try {
    const body = await response.json();

    // 409 and other HTTPException responses: { detail: "message" }
    if (typeof body.detail === "string") return body.detail;

    // 422 validation errors: { detail: [{ msg: "..." }, ...] }
    if (Array.isArray(body.detail) && body.detail.length > 0) {
      return String(body.detail[0].msg).replace(/^Value error, /, "");
    }
  } catch {
    // Response was not JSON; fall through to the generic message.
  }

  return GENERIC_ERROR;
}

// Takes the account object built by SignupForm (camelCase) and sends it to the
// backend (snake_case). Resolves with the created user, throws an Error whose
// message is safe to show to the person signing up.
export async function registerUser(account) {
  const address = account.shippingAddress;

  const payload = {
    first_name: account.firstName,
    last_name: account.lastName,
    email: account.email,
    phone: account.phone || null,
    password: account.password,
    accept_terms: account.acceptTerms,
    marketing_opt_in: account.marketingEmails,
    shipping_address: address
      ? {
          street: address.street,
          barangay: address.barangay,
          city: address.city,
          province: address.province,
          postal_code: address.postalCode,
          country: address.country,
        }
      : null,
  };

  let response;
  try {
    response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Could not reach the server. Please check your connection and try again."
    );
  }

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.json();
}
