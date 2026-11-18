import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router";
import { createProduct, getAllProducts, updateProduct } from "../../api/admin";
import { getCategories } from "../../api/products";
import AdminPageHeader, { LoadError } from "../../components/admin/AdminPageHeader";
import Toggle from "../../components/admin/Toggle";
import { CloseIcon, PlusIcon, SearchIcon } from "../../components/Icons";
import ProductImage from "../../components/ProductImage";
import { useAuth } from "../../context/AuthContext";
import { formatPrice } from "../../utils/format";

const LOW_STOCK = 5;

const isLow = (product) => product.is_active && product.stock_qty <= LOW_STOCK;

const VIEWS = [
  { id: "all", label: "All", test: () => true },
  { id: "on-sale", label: "On sale", test: (product) => product.is_active },
  { id: "hidden", label: "Hidden", test: (product) => !product.is_active },
  { id: "low", label: "Running low", test: isLow },
  { id: "featured", label: "Featured", test: (product) => product.is_featured },
];

export default function AdminProductsPage() {
  const { token } = useAuth();
  const { refreshCounts } = useOutletContext();
  const [params, setParams] = useSearchParams();
  const view = VIEWS.find((item) => item.id === params.get("show")) ?? VIEWS[0];
  const [products, setProducts] = useState(null); // null = loading
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // a product, "new", or null

  const load = useCallback(() => {
    setError("");
    Promise.all([getAllProducts(token), getCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
      })
      .catch((err) => setError(err.message));
  }, [token]);

  useEffect(load, [load]);

  const categoryName = (id) => categories.find((category) => category.category_id === id)?.name ?? "No category";

  const visible = useMemo(() => {
    const words = search.trim().toLowerCase();
    return (products ?? [])
      .filter(view.test)
      .filter((product) => !words || product.name.toLowerCase().includes(words));
  }, [products, search, view]);

  function showView(id) {
    setParams(id === "all" ? {} : { show: id }, { replace: true });
  }

  function saved(product) {
    setProducts((current) => {
      const exists = current.some((item) => item.product_id === product.product_id);
      return exists
        ? current.map((item) => (item.product_id === product.product_id ? product : item))
        : [...current, product];
    });
    refreshCounts();
  }

  return (
    <>
      <AdminPageHeader title="Products" description="Prices, stock, and what shows in the shop.">
        <button type="button" onClick={() => setEditing("new")} className="btn-primary">
          <PlusIcon className="h-4 w-4" />
          Add product
        </button>
      </AdminPageHeader>

      {error ? (
        <LoadError message={error} onRetry={load} />
      ) : products === null ? (
        <p className="py-16 text-center text-muted">Loading products…</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" aria-label="Show products" className="scroll-row -mx-4 gap-2 px-4 pb-1 sm:mx-0 sm:px-0">
              {VIEWS.map((item) => {
                const count = products.filter(item.test).length;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={item.id === view.id}
                    onClick={() => showView(item.id)}
                    className="chip"
                  >
                    {item.label}
                    {count > 0 && (
                      <span className={`tabular-nums ${item.id === "low" ? "" : "opacity-60"}`}>{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="relative w-full sm:w-64">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="input rounded-full py-2 pl-10"
              />
            </div>
          </div>

          <div className="card mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-line text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">On sale</th>
                  <th className="px-4 py-3 font-semibold">Featured</th>
                  <th className="px-4 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((product) => (
                  <ProductRow
                    key={product.product_id}
                    product={product}
                    category={categoryName(product.category_id)}
                    token={token}
                    onSaved={saved}
                    onEdit={() => setEditing(product)}
                  />
                ))}
              </tbody>
            </table>
            {visible.length === 0 && (
              <p className="px-6 py-10 text-center text-muted">
                {view.id === "low" ? "Nothing is running low. Everything on sale has more than 5 left." : "No products match."}
              </p>
            )}
          </div>
        </>
      )}

      {editing && (
        <ProductForm
          product={editing === "new" ? null : editing}
          categories={categories}
          token={token}
          onClose={() => setEditing(null)}
          onSaved={(product) => {
            saved(product);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

function ProductRow({ product, category, token, onSaved, onEdit }) {
  const [stock, setStock] = useState(String(product.stock_qty));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setStock(String(product.stock_qty)), [product.stock_qty]);

  async function save(changes) {
    setBusy(true);
    setError("");
    try {
      onSaved(await updateProduct(token, product.product_id, changes));
    } catch (err) {
      setError(err.message);
      setStock(String(product.stock_qty));
    } finally {
      setBusy(false);
    }
  }

  function saveStock() {
    const value = Number(stock);
    if (stock === "" || !Number.isInteger(value) || value < 0) {
      setStock(String(product.stock_qty));
      return;
    }
    if (value !== product.stock_qty) save({ stock_qty: value });
  }

  const low = product.stock_qty <= LOW_STOCK;

  return (
    <tr className={product.is_active ? "" : "bg-cream/70"}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <ProductImage
            src={product.image_url}
            alt=""
            iconClassName="h-5 w-5"
            dimmed={!product.is_active}
            className="h-12 w-12 shrink-0 rounded-lg"
          />
          <div className="min-w-0">
            <Link to={`/products/${product.product_id}`} className="font-semibold hover:text-berry">
              {product.name}
            </Link>
            <p className="text-xs text-muted">
              {category}
              {!product.is_active && " (hidden from the shop)"}
            </p>
            {error && <p className="text-xs text-berry">{error}</p>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">{formatPrice(product.price)}</td>
      <td className="px-4 py-3">
        <input
          type="number"
          min="0"
          value={stock}
          disabled={busy}
          onChange={(event) => setStock(event.target.value)}
          onBlur={saveStock}
          onKeyDown={(event) => event.key === "Enter" && event.currentTarget.blur()}
          aria-label={`Stock for ${product.name}`}
          className={`input w-20 px-2 py-1.5 ${low ? "border-berry/50 text-berry" : ""}`}
        />
      </td>
      <td className="px-4 py-3">
        <Toggle
          checked={product.is_active}
          disabled={busy}
          label={`${product.name} on sale`}
          onChange={(value) => save({ is_active: value })}
        />
      </td>
      <td className="px-4 py-3">
        <Toggle
          checked={product.is_featured}
          disabled={busy}
          label={`${product.name} featured on the home page`}
          onChange={(value) => save({ is_featured: value })}
        />
      </td>
      <td className="px-4 py-3 text-right">
        <button type="button" onClick={onEdit} className="btn-quiet">
          Edit
        </button>
      </td>
    </tr>
  );
}

function ProductForm({ product, categories, token, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? String(product.price) : "",
    stock_qty: product ? String(product.stock_qty) : "0",
    category_id: product?.category_id != null ? String(product.category_id) : "",
    image_url: product?.image_url ?? "",
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const close = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [onClose]);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock_qty: Number(form.stock_qty),
      category_id: form.category_id ? Number(form.category_id) : null,
      image_url: form.image_url,
      is_active: form.is_active,
      is_featured: form.is_featured,
    };
    try {
      onSaved(
        product
          ? await updateProduct(token, product.product_id, payload)
          : await createProduct(token, payload)
      );
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-ink/40 p-4 sm:p-8"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <form onSubmit={handleSubmit} className="card relative my-auto w-full max-w-xl space-y-5 p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-muted hover:bg-sand hover:text-ink"
        >
          <CloseIcon />
        </button>
        <h2 id="product-form-title" className="text-2xl font-semibold">
          {product ? "Edit product" : "Add a product"}
        </h2>

        <div>
          <label htmlFor="pf-name" className="label">Name</label>
          <input id="pf-name" name="name" required maxLength={150} value={form.name} onChange={update} className="input" />
        </div>

        <div>
          <label htmlFor="pf-description" className="label">Description</label>
          <textarea
            id="pf-description"
            name="description"
            rows={3}
            maxLength={2000}
            value={form.description}
            onChange={update}
            className="input"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="pf-price" className="label">Price (₱)</label>
            <input id="pf-price" name="price" type="number" required min="0.01" step="0.01" value={form.price} onChange={update} className="input" />
          </div>
          <div>
            <label htmlFor="pf-stock" className="label">Stock</label>
            <input id="pf-stock" name="stock_qty" type="number" required min="0" step="1" value={form.stock_qty} onChange={update} className="input" />
          </div>
          <div>
            <label htmlFor="pf-category" className="label">Category</label>
            <select id="pf-category" name="category_id" value={form.category_id} onChange={update} className="input">
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="pf-image" className="label">Photo address</label>
          <input
            id="pf-image"
            name="image_url"
            maxLength={500}
            placeholder="/images/products/daisy-tote.jpg"
            value={form.image_url}
            onChange={update}
            className="input"
          />
          <p className="mt-1 text-xs text-muted">
            Put the photo in la-crochet-project/public/images/products and type its address here.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm font-semibold">
            <Toggle
              checked={form.is_active}
              label="On sale"
              onChange={(value) => setForm((current) => ({ ...current, is_active: value }))}
            />
            On sale
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <Toggle
              checked={form.is_featured}
              label="Featured on the home page"
              onChange={(value) => setForm((current) => ({ ...current, is_featured: value }))}
            />
            Featured on the home page
          </label>
        </div>

        {error && (
          <p role="alert" className="alert-error">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn-quiet">
            Cancel
          </button>
          <button type="submit" disabled={busy} className="btn-primary">
            {busy ? "Saving…" : product ? "Save changes" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
}
