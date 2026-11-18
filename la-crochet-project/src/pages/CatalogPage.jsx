import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/catalog/ProductCard";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:8000/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        const data = await response.json();

        console.log("Fetched products:", data);
        console.table(data);

        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <div className="bg-black/95 text-white text-xs tracking-widest text-center py-2 px-4 uppercase font-poppins">
        <p>
          Complimentary worldwide shipping on orders over $150 &mdash;
          Minimalist Design No. 04
        </p>
      </div>
      <Navbar onLoginClick={() => setShowLogin(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 border-b border-brand-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="text-xs text-neutral-400 uppercase tracking-widest mb-2">
              Home / Catalog / All Objects
            </nav>
            <h1 className="text-3xl font-light tracking-tight">
              The Monolithic Collection
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Refined everyday essentials designed with uncompromising
              minimalism.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              id="mobile-filter-toggle"
              className="lg:hidden flex items-center space-x-2 border border-brand-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-50 transition-colors"
            >
              <i data-lucide="sliders-horizontal" className="w-4 h-4"></i>
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <span className="hidden sm:inline">Sort by:</span>
              <select
                id="sort-select"
                className="bg-white border border-brand-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-brand-900"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          <aside
            id="filter-sidebar"
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl p-6 overflow-y-auto transform -translate-x-full lg:translate-x-0 lg:static lg:z-0 lg:w-auto lg:shadow-none lg:p-0 lg:block transition-transform duration-300"
          >
            <div className="flex items-center justify-between pb-4 border-b border-brand-100 lg:hidden">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                id="close-filter-sidebar"
                className="p-2 text-neutral-500 hover:text-brand-900"
              >
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <div className="space-y-8 mt-6 lg:mt-0">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                  Categories
                </h3>
                <div id="category-filters" className="space-y-2 text-sm">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="category"
                      value="all"
                      defaultChecked
                      className="rounded border-brand-300 text-brand-900 focus:ring-0 w-4 h-4"
                    />
                    <span className="group-hover:text-black text-neutral-600">
                      All Categories
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="category"
                      value="Apparel"
                      className="rounded border-brand-300 text-brand-900 focus:ring-0 w-4 h-4"
                    />
                    <span className="group-hover:text-black text-neutral-600">
                      Apparel
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="category"
                      value="Footwear"
                      className="rounded border-brand-300 text-brand-900 focus:ring-0 w-4 h-4"
                    />
                    <span className="group-hover:text-black text-neutral-600">
                      Sewing, Knitting & Crochet
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="category"
                      value="Accessories"
                      className="rounded border-brand-300 text-brand-900 focus:ring-0 w-4 h-4"
                    />
                    <span className="group-hover:text-black text-neutral-600">
                      Accessories
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="category"
                      value="Objects"
                      className="rounded border-brand-300 text-brand-900 focus:ring-0 w-4 h-4"
                    />
                    <span className="group-hover:text-black text-neutral-600">
                      Objects & Lanyards
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="category"
                      value="Objects"
                      className="rounded border-brand-300 text-brand-900 focus:ring-0 w-4 h-4"
                    />
                    <span className="group-hover:text-black text-neutral-600">
                      Cutting Tools
                    </span>
                  </label>
                </div>
              </div>

              <div className="border-t border-brand-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Max Price
                  </h3>
                  <span
                    id="price-output"
                    className="text-xs font-medium bg-brand-100 px-2 py-1 rounded"
                  >
                    $500
                  </span>
                </div>
                <input
                  type="range"
                  id="price-range-slider"
                  min="50"
                  max="500"
                  step="10"
                  defaultValue="500"
                  className="w-full accent-brand-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-2">
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>

              <div className="border-t border-brand-100 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                  Colorway
                </h3>
                <div id="color-filters" className="flex flex-wrap gap-2">
                  <button
                    data-color="Black"
                    className="w-7 h-7 rounded-full bg-neutral-900 border-2 border-transparent focus:outline-none ring-offset-2 focus:ring-2 focus:ring-brand-900 transition-all shadow-sm"
                    title="Black"
                  ></button>
                  <button
                    data-color="White"
                    className="w-7 h-7 rounded-full bg-white border-2 border-neutral-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-brand-900 transition-all shadow-sm"
                    title="White"
                  ></button>
                  <button
                    data-color="Gray"
                    className="w-7 h-7 rounded-full bg-neutral-400 border-2 border-transparent focus:outline-none ring-offset-2 focus:ring-2 focus:ring-brand-900 transition-all shadow-sm"
                    title="Gray"
                  ></button>
                  <button
                    data-color="Beige"
                    className="w-7 h-7 rounded-full bg-[#E5DCC3] border-2 border-transparent focus:outline-none ring-offset-2 focus:ring-2 focus:ring-brand-900 transition-all shadow-sm"
                    title="Beige"
                  ></button>
                  <button
                    data-color="Olive"
                    className="w-7 h-7 rounded-full bg-[#555D50] border-2 border-transparent focus:outline-none ring-offset-2 focus:ring-2 focus:ring-brand-900 transition-all shadow-sm"
                    title="Olive"
                  ></button>
                </div>
              </div>

              <div className="border-t border-brand-100 pt-6">
                <button
                  id="reset-filters-btn"
                  className="w-full border border-brand-300 text-brand-900 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium hover:bg-brand-900 hover:text-white transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div
              id="active-filters-bar"
              className="flex flex-wrap items-center gap-2 mb-6 hidden"
            >
              <span className="text-xs text-neutral-400 uppercase tracking-widest">
                Active:
              </span>
            </div>

            <div
              id="product-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openProductModal={() => {}}
                  toggleWishlist={() => {}}
                  addToCart={() => {}}
                />
              ))}
            </div>

            <div
              id="empty-state"
              className="hidden text-center py-24 border border-dashed border-brand-200 rounded-xl mt-4"
            >
              <i
                data-lucide="package-open"
                className="w-12 h-12 text-neutral-300 mx-auto mb-4"
              ></i>
              <h3 className="text-lg font-medium text-brand-900">
                No matching products found
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                Try adjusting your filter parameters or search criteria.
              </p>
              <button
                id="clear-search-filters"
                className="mt-6 bg-brand-900 text-white px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
