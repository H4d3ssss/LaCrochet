import { useState } from "react";
import { Link } from "react-router";

import shoppingcart from "../assets/cart/shopping-cart.svg";
import account from "../assets/gen/account.svg";
import search from "../assets/gen/search-icon.svg";

export default function Navbar({onLoginClick}) {
  const user = null;
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50">
      <nav className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 xl:grid-cols-[1fr_auto_1fr] xl:px-12 bg-[#A90000] text-[#FFE6D9] font-bold">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold p-2 font-lora">
            LaCrochet.
          </Link>
        </div>
        <div className="hidden xl:flex nav-links">
          <ul className="flex flex-row space-x-4 text-[#FFE6D9] font-nunito">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="flex item-center gap-4 justify-self-end">
          <div className="hidden xl:flex items-center border border-black/40 rounded-full text-[#FFE6D9]">
            <input
              className="p-2 mx-4 focus:outline-none"
              type="text"
              name="search"
              id="search"
              placeholder="Search"
            />

            <button type="submit" className="cursor-pointer">
              <img className="w-6 h-6 mx-4" src={search} alt="Search" />
            </button>
          </div>

          <div className="flex flex-row space-x-6 items-center text-[#FFE6D9]">
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
                <button onClick={onLoginClick} className="cursor-pointer">Login</button>
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
