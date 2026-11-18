import { useState } from "react";
import { Link } from "react-router-dom";

import shoppingcart from "../assets/cart/shopping-cart.svg";
import account from "../assets/gen/account.svg";
import search from "../assets/gen/search-icon.svg";
import heart from "../assets/gen/heart.svg";

export default function Navbar({ onLoginClick }) {
  const user = null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-2xs">
      <nav className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 xl:grid-cols-[1fr_auto_1fr] xl:px-12 bg-white text-black font-bold max-w-7xl mx-auto sm:px-6 lg:px-2">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold p-2 font-lora">
            LaCrochet.
          </Link>
        </div>
        <div className="hidden xl:flex nav-links font-poppins font-light text-sm">
          <ul className="flex flex-row space-x-4 text-black font-nunito ">
            <li className="text-black/65 hover:text-black transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="text-black/65 hover:text-black transition-colors">
              <a href="#">Catalog</a>
            </li>
            <li className="text-black/65 hover:text-black transition-colors">
              <a href="#">About</a>
            </li>
            <li className="text-black/65 hover:text-black transition-colors">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="flex item-center gap-4 justify-self-end">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setSearchOpen((previous) => !previous)}
          >
            <img className="w-5 h-5 mx-2" src={search} alt="Search" />
          </button>

          <button type="button" className="cursor-pointer">
            <img className="w-5 h-5 mx-2" src={heart} alt="Heart" />
          </button>

          <div className="flex flex-row space-x-6 items-center text-black">
            {user ? (
              <>
                <a href="#">
                  <img className="w-7 h-7" src={shoppingcart} alt="Cart" />
                </a>
                <a href="#">
                  <img className="w-7 h-7" src={account} alt="Account" />
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="cursor-pointer font-normal"
                >
                  Login
                </button>
              </>
            )}
          </div>

          <button type="submit" className="cursor-pointer">
            <img className="w-6 h-6 mx-4 xl:hidden" src={search} alt="Search" />
          </button>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="h-0.5 w-6 bg-black" />
            <span className="h-0.5 w-6 bg-black" />
            <span className="h-0.5 w-6 bg-black" />
          </button>
        </div>
      </nav>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}

      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col gap-4 border-t bg-white p-4 items-end xl:hidden"
        >
          {["Home", "Products", "About", "Contact"].map((label) => (
            <a key={label} href="#" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function SearchBar({ onClose }) {
  return (
    <div
      id="search-bar-container"
      className="border-t border-black/5 bg-black/3 px-4 py-4"
    >
      <div className="max-w-3xl mx-auto relative flex items-center">
        <img src={search} alt="" className="absolute left-4 w-5 h-5" />

        <input
          type="search"
          id="header-search-input"
          placeholder="Search by product name, category, or color..."
          className="w-full bg-white border border-brand-100 rounded-lg pl-12 pr-10 py-3 text-sm focus:outline-none focus:border-brand-900 shadow-sm"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="absolute right-4 text-neutral-400 hover:text-brand-900 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
