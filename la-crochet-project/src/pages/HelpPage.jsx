import { Link } from "react-router";
import PageLayout from "../components/PageLayout";

// Each section has an id so Footer links like /help#shipping jump straight to it.
const sections = [
  {
    id: "track-order",
    title: "Track an order",
    text: "Log in and open My orders from the menu at the top right to see where each order is.",
  },
  {
    id: "shipping",
    title: "Shipping & delivery",
    text: "Home delivery costs ₱90. You can also pick your order up from the shop for free.",
  },
  { id: "returns", title: "Returns & exchanges", text: null },
  { id: "faqs", title: "FAQs", text: null },
];

export default function HelpPage() {
  return (
    <PageLayout>
      <h1 className="page-title">Help</h1>

      <div className="mt-8 space-y-4">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="card scroll-mt-28 p-6">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {/* TODO: write the sections marked "coming soon". */}
            <p className="mt-2 text-muted">{section.text ?? "Details coming soon."}</p>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Still stuck?{" "}
        <Link to="/contact" className="link">
          Contact us
        </Link>
        .
      </p>
    </PageLayout>
  );
}
