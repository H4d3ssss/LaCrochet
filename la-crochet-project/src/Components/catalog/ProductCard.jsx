export default function ProductCard({product, openProductModal, toggleWishlist, addToCart}) {
  return (
    <div className="group flex flex-col">
      <div
        className="relative bg-brand-50 rounded-xl overflow-hidden aspect-[4/5] mb-4 cursor-pointer"
        onClick={() => openProductModal(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://placehold.co/600x800/f1f1f1/171717?text=Aether+Object";
          }}
        />

        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-900 text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-sm text-neutral-700 rounded-full transition-colors"
          aria-label="Save to Wishlist"
        >
          <span aria-hidden="true">♡</span>
        </button>

        {/* Quick Add Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              addToCart(product.id);
            }}
            className="w-full bg-white/95 hover:bg-brand-900 hover:text-white backdrop-blur-md text-brand-900 font-medium text-xs uppercase tracking-widest py-3 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span aria-hidden="true">+</span>
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>{product.category}</span>
            <span>{product.color}</span>
          </div>

          <h3
            onClick={() => openProductModal(product.id)}
            className="text-sm font-medium text-brand-900 hover:text-neutral-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-2 text-sm font-semibold text-brand-900">
          ₱{product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}