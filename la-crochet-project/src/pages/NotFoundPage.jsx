import { Link } from "react-router";
import PageLayout from "../components/PageLayout";

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="py-12 text-center">
        <p className="font-serif text-6xl font-semibold text-terracotta">404</p>
        <h1 className="mt-4 text-3xl font-semibold">We dropped a stitch</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          This page doesn't exist, or it has moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            Go home
          </Link>
          <Link to="/catalog" className="btn-secondary">
            Browse the shop
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
