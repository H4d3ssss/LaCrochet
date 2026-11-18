import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Shop",
    links: [
      "Yarn & Fibers",
      "Hooks & Notions",
      "Crochet Kits",
      "Patterns & Guides",
      "Finished Goods",
    ],
  },
  {
    title: "Customer Care",
    links: [
      "Track My Order",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "FAQs",
      "Contact Us",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black/2 text-black/50 font-nunito">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="max-w-sm">
            <Link to="/" className="font-lora text-2xl font-bold text-black">
              LaCrochet.
            </Link>

            <p className="mt-4 text-sm leading-7">
              Your cozy corner for crochet supplies, creative patterns, and
              locally handcrafted pieces in the Philippines.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-bold text-black">
                {group.title}
              </h3>

              <ul className="space-y-3 text-sm">
                {group.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="transition-colors hover:text-black"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="min-w-0">
            <h3 className="mb-4 text-sm font-bold text-black">
              Newsletter
            </h3>

            <p className="mb-4 text-sm leading-7">
              Subscribe for early access to limited editions and design notes.
            </p>

            <form
              className="flex overflow-hidden rounded-lg border border-black/15"
              onSubmit={(event) => {
                event.preventDefault();
                // Add your subscription logic here.
              }}
            >
              <input
                type="email"
                name="email"
                required
                aria-label="Email address"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-inset focus:ring-black/30"
              />

              <button
                type="submit"
                className="cursor-pointer bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-black/80"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-black/5 pt-6">
          <p className="text-xs text-black/30">
            &copy; {new Date().getFullYear()} LaCrochet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}