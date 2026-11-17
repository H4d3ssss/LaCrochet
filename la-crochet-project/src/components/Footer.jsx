function Footer() {
  return (
    <footer className="bg-[#3F0000] text-stone-300 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand + Newsletter */}
        <div className="lg:col-span-2">
          <h1 className="font-serif font-bold text-2xl text-white mb-3">
            LaCrochet.
          </h1>
          <p className="text-sm text-[#D39171] mb-6">
            Your cozy corner for artisanal crochet supplies, pattern drops, and timeless handmade pieces crafted locally in the Philippines.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Yarn & Fibers</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Hooks & Notions</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Crochet Kits</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Patterns & Guides</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Finished Goods</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Track My Order</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Shipping & Delivery</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Returns & Exchanges</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">FAQs</a></li>
            <li><a href="#" className="text-[#D39171] hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p className="text-white">&copy; 2026 LaCrochet. All rights reserved.</p>
        <div className="flex items-center gap-4 text-stone-400 text-lg">
          <a href="#" className="hover:text-white transition"><i className="fa-brands fa-instagram" /></a>
          <a href="#" className="hover:text-white transition"><i className="fa-brands fa-facebook" /></a>
          <a href="#" className="hover:text-white transition"><i className="fa-brands fa-tiktok" /></a>
          <a href="#" className="hover:text-white transition"><i className="fa-brands fa-pinterest" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer