import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  addCartItem,
  emptyCart,
  getCart,
  removeCartItem,
  setCartItemQuantity,
} from "../api/cart";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
const OLD_STORAGE_KEY = "lacrochet-cart"; // carts used to live in the browser
const EMPTY_CART = { items: [], count: 0, subtotal: 0 };

function getProductId(product) {
  return product?.id ?? product?.product_id ?? product?.productId;
}

// Server shape → the shape the pages already use.
function toCart(data) {
  return {
    items: data.items.map((line) => ({
      id: line.product_id,
      name: line.name,
      image: line.image_url,
      price: line.price,
      quantity: line.quantity,
      stockQty: line.stock_qty,
      available: line.available,
    })),
    count: data.count,
    subtotal: data.subtotal,
  };
}

export function CartProvider({ children }) {
  const { user, token, requestLogin } = useAuth();
  const [cart, setCart] = useState(EMPTY_CART);
  const [isLoading, setIsLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  // Item a guest clicked before logging in; added as soon as they log in.
  const pendingAddRef = useRef(null);

  // Carts now live in the database: clear the old browser copy once.
  useEffect(() => {
    try {
      localStorage.removeItem(OLD_STORAGE_KEY);
    } catch {
      // Storage unavailable; nothing to clean up.
    }
  }, []);

  const applyCart = useCallback((data) => {
    setCart(toCart(data));
    setCartError("");
  }, []);

  // Load the logged-in customer's cart (and finish a pending "Add to Cart").
  // Logged out → empty cart.
  useEffect(() => {
    if (!user || !token) {
      setCart(EMPTY_CART);
      return;
    }

    let ignore = false;
    const pending = pendingAddRef.current;
    pendingAddRef.current = null;

    setIsLoading(true);
    const load = pending
      ? addCartItem(token, pending.productId, pending.quantity).catch((error) => {
          // Couldn't add it (e.g. sold out): still show their cart, plus why.
          if (!ignore) setCartError(error.message);
          return getCart(token);
        })
      : getCart(token);

    load
      .then((data) => {
        if (!ignore) setCart(toCart(data));
      })
      .catch((error) => {
        if (!ignore) setCartError(error.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [user, token]);

  const refreshCart = useCallback(async () => {
    if (!token) return;
    try {
      applyCart(await getCart(token));
    } catch (error) {
      setCartError(error.message);
    }
  }, [token, applyCart]);

  // Returns { ok: true } if added. Guests get the login popup instead,
  // and the item is added right after they log in.
  async function addToCart(product, quantity = 1) {
    const productId = getProductId(product);
    const amount = Math.max(1, Math.floor(Number(quantity) || 1));

    if (!user) {
      requestLogin(() => {
        pendingAddRef.current = { productId, quantity: amount };
      }, "to add this to your cart");
      return { ok: false, needsLogin: true };
    }

    try {
      applyCart(await addCartItem(token, productId, amount));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async function changeQuantity(productId, amount) {
    const item = cart.items.find((line) => line.id === productId);
    if (!item) return;
    const quantity = item.quantity + amount;
    if (quantity < 1) return;

    try {
      applyCart(await setCartItemQuantity(token, productId, quantity));
    } catch (error) {
      setCartError(error.message);
    }
  }

  async function removeFromCart(productId) {
    try {
      applyCart(await removeCartItem(token, productId));
    } catch (error) {
      setCartError(error.message);
    }
  }

  async function clearCart() {
    if (!token) {
      setCart(EMPTY_CART);
      return;
    }
    try {
      applyCart(await emptyCart(token));
    } catch (error) {
      setCartError(error.message);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: cart.items,
        cartCount: cart.count,
        subtotal: cart.subtotal,
        isLoading,
        cartError,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
