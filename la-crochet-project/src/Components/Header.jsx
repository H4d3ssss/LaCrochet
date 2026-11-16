function Header() {
  return (
    <nav className="sticky top-0 z-50 flex flex-col bg-[#F6EFE6]">
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Brand */}
        <a
          href="#"
          className="shrink-0 font-serif text-3xl font-bold text-[#55433B] transition duration-300 hover:text-[#7C8A6A]"
        >
          La Crochet.
        </a>

        {/* Nav links */}
        <div className="hidden space-x-6 md:flex">
          <a
            href="#"
            className="font-bold text-[#55433B] transition duration-300 hover:text-[#7C8A6A]"
          >
            Shop
          </a>
          <a
            href="#"
            className="font-bold text-[#55433B] transition duration-300 hover:text-[#7C8A6A]"
          >
            Yarns &amp; Supplies
          </a>
          <a
            href="#"
            className="font-bold text-[#55433B] transition duration-300 hover:text-[#7C8A6A]"
          >
            Finished Goods
          </a>
        </div>

        {/* Search */}
        <div className="hidden max-w-xs flex-1 items-center lg:flex">
          <i className="fa-solid fa-magnifying-glass mr-2 text-[#55433B]" />
          <input
            type="text"
            placeholder="Search yarns, hooks, patterns..."
            className="w-full rounded-full border border-[#55433B] bg-white px-4 py-1.5 text-[#55433B] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#7C8A6A]"
          />
        </div>

        {/* Icons */}
        <div className="mr-15 flex items-center space-x-4">
          <a
            href="#cart"
            aria-label="Shopping cart"
            className="text-[#55433B] transition duration-300 hover:text-[#7C8A6A]"
          >
            <i className="fa-solid fa-cart-shopping text-lg" />
          </a>
          <a
            href="#account"
            aria-label="Account"
            className="text-[#55433B] transition duration-300 hover:text-[#7C8A6A]"
          >
            <i className="fa-solid fa-user text-lg" />
          </a>
        </div>
      </div>

      {/* Horizontal line under the navbar */}
      <hr className="m-0 w-full border-0 border-t border-black" />
    </nav>
  );
}

export default Header;