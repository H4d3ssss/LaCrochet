import { Link } from "react-router";
import PageLayout from "../components/PageLayout";

export default function AboutPage() {
  return (
    <PageLayout>
      <h1 className="page-title">About La Crochet</h1>
      <div className="mt-6 space-y-4 text-lg leading-8 text-ink/85">
        <p>
          La Crochet is a small shop for crochet supplies and handmade pieces, based in the
          Philippines.
        </p>
        {/* TODO: tell your story here: who makes the pieces, how it started, what you care about. */}
        <p>
          Every tote, flower and keychain is crocheted by hand, and we stock the yarn and tools we
          use ourselves, so you can make your own.
        </p>
      </div>
      <Link to="/catalog" className="btn-primary mt-8">
        Browse the shop
      </Link>
    </PageLayout>
  );
}
