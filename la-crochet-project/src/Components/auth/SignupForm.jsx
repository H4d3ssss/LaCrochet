import { useState } from "react";
import { registerUser } from "../../api/auth";

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#3F0000] focus:ring-1 focus:ring-[#3F0000]";

function Field({ label, id, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-stone-700"
      >
        {label}
      </label>

      <input id={id} className={inputClass} {...props} />
    </div>
  );
}

export default function SignupForm({
  onLogin,
  onClose,
  onLoginClick,
  onSignup = registerUser,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdName, setCreatedName] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Your passwords do not match.");
      return;
    }

    const account = {
      firstName: data.get("firstName").trim(),
      lastName: data.get("lastName").trim(),
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
      password: data.get("password"),
      acceptTerms: data.get("acceptTerms") === "on",
      marketingEmails: data.get("marketingEmails") === "on",
      shippingAddress: addAddress
        ? {
            street: data.get("street").trim(),
            barangay: data.get("barangay").trim(),
            city: data.get("city").trim(),
            province: data.get("province").trim(),
            postalCode: data.get("postalCode").trim(),
            country: "Philippines",
          }
        : null,
    };

    if (!account.firstName || !account.lastName) {
      setError("Please enter your first and last name.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSignup(account);
      setCreatedName(account.firstName);
    } catch (err) {
      setError(
        err?.message || "Could not create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (createdName) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
            className="w-full max-w-md rounded-2xl bg-white p-8 text-center font-poppins shadow-xl"
          >
            <h1
              id="signup-success-title"
              className="text-2xl font-bold text-stone-800"
            >
              Welcome to <span className="font-serif text-3xl">LaCrochet,</span>{" "}
              {createdName}!
            </h1>

            <p className="mt-3 text-sm text-stone-500">
              Your account has been created.
            </p>

            {(onLoginClick || onClose) && (
              <button
                type="button"
                onClick={onLoginClick ?? onClose}
                className="mt-6 w-full cursor-pointer rounded-lg bg-[#292929] px-4 py-3 font-semibold text-white transition-colors hover:bg-black"
              >
                {onLoginClick ? "Sign in" : "Continue shopping"}
              </button>
            )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-title"
          className="relative w-full max-w-2xl rounded-2xl bg-white p-6 font-poppins shadow-xl sm:p-10"
        >
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close signup"
              className="absolute right-5 top-4 cursor-pointer text-2xl text-stone-400 hover:text-stone-800"
            >
              ×
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Heading */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#3F0000]">
                Made with love, just for you
              </p>

              <h1
                id="signup-title"
                className="text-2xl font-bold text-stone-800"
              >
                Welcome to{" "}
                <span className="font-serif text-3xl">LaCrochet.</span>
              </h1>

              <p className="mt-2 text-sm text-stone-500">
                Create an account to save your favorites, shop handmade pieces,
                and keep track of your orders.
              </p>
            </div>

            {/* Personal information */}
            <fieldset className="space-y-4">
              <legend className="mb-2 text-base font-semibold text-stone-800">
                Personal information
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  id="signup-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Juan"
                  required
                />

                <Field
                  label="Last name"
                  id="signup-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Dela Cruz"
                  required
                />
              </div>

              <Field
                label={
                  addAddress
                    ? "Mobile number (needed for delivery)"
                    : "Mobile number (optional)"
                }
                id="signup-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+63 917 123 4567"
                required={addAddress}
              />
            </fieldset>

            <div className="h-px bg-stone-200" />

            {/* Account details */}
            <fieldset className="space-y-4">
              <legend className="mb-2 text-base font-semibold text-stone-800">
                Account details
              </legend>

              <Field
                label="Email address"
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Password"
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  minLength={8}
                  aria-describedby="signup-password-hint"
                  required
                />

                <Field
                  label="Confirm password"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p id="signup-password-hint" className="text-xs text-stone-500">
                  Use at least 8 characters.
                </p>

                <label className="flex cursor-pointer items-center gap-2 text-xs text-stone-600">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(event) => setShowPassword(event.target.checked)}
                    className="h-4 w-4 accent-[#3F0000]"
                  />
                  Show passwords
                </label>
              </div>
            </fieldset>

            <div className="h-px bg-stone-200" />

            {/* Optional shipping address */}
            <div className="space-y-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={addAddress}
                  onChange={(event) => setAddAddress(event.target.checked)}
                  aria-controls="signup-shipping-address"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#3F0000]"
                />

                <span>
                  <span className="block text-sm font-semibold text-stone-800">
                    Add a shipping address
                  </span>
                  <span className="mt-1 block text-xs text-stone-500">
                    Save time at checkout. You can also add this later.
                  </span>
                </span>
              </label>

              {addAddress && (
                <fieldset
                  id="signup-shipping-address"
                  className="space-y-4 rounded-xl border border-stone-200 bg-stone-50 p-4"
                >
                  <legend className="px-1 text-sm font-semibold text-stone-700">
                    Shipping address
                  </legend>

                  <Field
                    label="House / unit number, building, and street"
                    id="signup-street"
                    name="street"
                    type="text"
                    autoComplete="address-line1"
                    placeholder="Unit 4, 123 Sampaguita Street"
                    required
                  />

                  <Field
                    label="Barangay"
                    id="signup-barangay"
                    name="barangay"
                    type="text"
                    autoComplete="address-line2"
                    placeholder="Barangay name"
                    required
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="City / municipality"
                      id="signup-city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Quezon City"
                      required
                    />

                    <Field
                      label="Province / region"
                      id="signup-province"
                      name="province"
                      type="text"
                      autoComplete="address-level1"
                      placeholder="Metro Manila"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Postal code"
                      id="signup-postal-code"
                      name="postalCode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="1100"
                      pattern="[0-9]{4}"
                      title="Enter a 4-digit Philippine postal code"
                      required
                    />

                    <Field
                      label="Country"
                      id="signup-country"
                      type="text"
                      autoComplete="country-name"
                      value="Philippines"
                      readOnly
                    />
                  </div>
                </fieldset>
              )}
            </div>

            {/* Preferences and terms */}
            <div className="space-y-4">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-stone-600">
                <input
                  name="marketingEmails"
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#3F0000]"
                />

                <span>
                  Email me about new collections, special offers, and LaCrochet
                  updates.
                </span>
              </label>

              <div className="flex items-start gap-3 text-sm text-stone-600">
                <input
                  id="signup-terms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-[#3F0000]"
                />

                <div>
                  <label htmlFor="signup-terms">I agree to the </label>
                  <a
                    href="/terms"
                    className="font-medium text-[#3F0000] underline"
                  >
                    Terms of Service
                  </a>
                  {" and acknowledge the "}
                  <a
                    href="/privacy"
                    className="font-medium text-[#3F0000] underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-lg bg-[#292929] px-4 py-3 font-semibold text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            {onLoginClick && (
              <p className="text-center text-sm text-stone-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="cursor-pointer font-semibold text-[#3F0000] hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </form>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-stone-500">
            <button
              type="button"
              onClick={onLogin}
              className="cursor-pointer font-normal text-black hover:underline"
            >
              Go back to login
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
