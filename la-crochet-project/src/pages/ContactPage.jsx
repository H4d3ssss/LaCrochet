import { Link } from "react-router";
import PageLayout from "../components/PageLayout";

export default function ContactPage() {
  return (
    <PageLayout>
      <h1 className="page-title">Contact us</h1>
      <p className="mt-4 text-lg leading-8 text-ink/85">
        Questions about an order, a custom piece, or which yarn to pick? Send us a message.
      </p>

      {/* TODO: replace with the shop's real email, phone number and social media. */}
      <div className="card mt-8 p-6">
        <p className="text-muted">Contact details are coming soon.</p>
      </div>

      <p className="mt-6 text-sm text-muted">
        Looking for shipping or returns info? See the{" "}
        <Link to="/help" className="link">
          Help page
        </Link>
        .
      </p>
    </PageLayout>
  );
}
