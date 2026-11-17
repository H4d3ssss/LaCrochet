const products = [
  {
    name: "Dishie Yarn",
    image: "https://picsum.photos/seed/dishie/400/400",
    priceOld: "£4.99",
    priceNew: "£2.50",
    weight: "100g / skein",
    material: "100% Cotton",
  },
  {
    name: "Brava Worsted Yarn",
    image: "https://picsum.photos/seed/brava/400/400",
    priceOld: "£3.99",
    priceNew: "£2.00",
    weight: "100g / skein",
    material: "100% Premium Acrylic",
  },
  {
    name: "Palette Yarn",
    image: "https://picsum.photos/seed/palette/400/400",
    priceOld: "£5.49",
    priceNew: "£2.20",
    weight: "50g / ball",
    material: "100% Peruvian Highland Wool",
  },
  {
    name: "Wool of the Andes Tweed Worsted Yarn",
    image: "https://picsum.photos/seed/andes/400/400",
    priceOld: "£5.99",
    priceNew: "£3.00",
    weight: "50g / skein",
    material: "80% Peruvian Highland Wool, 20% Donegal Tweed",
  },
];

export default function NewYarns() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#3F0000]">New Selling Yarns</h2>
        <a
          href="#"
          className="text-xs font-semibold uppercase tracking-wide text-[#A90000] hover:text-[#3F0000] flex items-center gap-1"
        >
          Shop Category
          <span>→</span>
        </a>
      </div>

      <p className="text-stone-500 mb-10 max-w-2xl">
        Discover the best selling yarns, all at prices that make anything you dream up possible.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.name} className="flex flex-col items-center text-center text-[#3F0000]">
            <div className="w-full aspect-square bg-stone-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-semibold text-[#3F0000] text-sm mb-1">
              {product.name}
            </h3>

            <div className="text-sm mb-1">
              <span className="text-stone-400 line-through">{product.priceOld}</span>
              <span className="text-red-500 font-semibold ml-1">{product.priceNew}</span>
              <span className="text-stone-400"> | {product.weight}</span>
            </div>

            <p className="text-xs text-stone-500 mb-4">
              {product.material}
            </p>

            <button className="bg-[#A90000] hover:bg-[#3F0000] text-white text-xs font-semibold px-6 py-2 rounded-full transition">
              SHOP NOW
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}