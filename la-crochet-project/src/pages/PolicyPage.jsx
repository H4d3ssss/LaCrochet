import PageLayout from "../components/PageLayout";

const titles = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
};

export default function PolicyPage({ type }) {
  return (
    <PageLayout>
      <h1 className="page-title">{titles[type]}</h1>
      {/* TODO: paste the real policy text here before launch. */}
      <div className="card mt-8 p-6">
        <p className="text-muted">This page is being written and will be published soon.</p>
      </div>
    </PageLayout>
  );
}
