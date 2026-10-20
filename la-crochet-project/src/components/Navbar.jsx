import { useState } from "react";
import shoppingcart from "../assets/cart/shopping-cart.svg";
import lecrochetlogo from "../assets/lacrochetlogo.svg";
import account from "../assets/gen/account.svg";
import search from "../assets/gen/search-icon.svg";

export default function Navbar() {
  const user = null;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 p-4 px-12 transparent">
        <a href="#">
          <img src={lecrochetlogo} alt="lacrochet-logo" />
        </a>
        <div className="hidden xl:flex nav-links">
          <ul className="flex flex-row space-x-4 text-black">
            <li>
              <a href="#">Home</a>
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
          <div className="flex items-center border border-black/40 rounded-full ">
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

          <div className="flex flex-row space-x-6 items-center">
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
                <a href="#">Login</a>
              </>
            )}
          </div>

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
          className="flex flex-col gap-4 border-t bg-white p-4 justify-end xl:hidden"
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
