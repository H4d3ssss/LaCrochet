import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LoginRequired from "../auth/LoginRequired";
import PageLayout from "../PageLayout";

const tabClass = ({ isActive }) =>
  `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? "border-berry bg-berry text-white"
      : "border-line bg-card text-ink hover:border-berry hover:text-berry"
  }`;

// Wraps every admin page: checks the person is the shop owner, then shows
// the admin header with the Orders / Products switch.
export default function AdminShell({ children }) {
  const { user } = useAuth();

  return (
    <PageLayout width="wide">
      {!user ? (
        <LoginRequired title="Shop admin" message="Log in with the shop owner's account." />
      ) : user.role !== "admin" ? (
        <div className="card px-6 py-14 text-center">
          <h1 className="text-2xl font-semibold">This area is for the shop owner</h1>
          <p className="mt-2 text-muted">Your account doesn't have access to the admin tools.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="page-title">Shop admin</h1>
            <nav aria-label="Admin sections" className="flex gap-2">
              <NavLink to="/admin/orders" className={tabClass}>
                Orders
              </NavLink>
              <NavLink to="/admin/products" className={tabClass}>
                Products
              </NavLink>
            </nav>
          </div>
          <div className="mt-8">{children}</div>
        </>
      )}
    </PageLayout>
  );
}
