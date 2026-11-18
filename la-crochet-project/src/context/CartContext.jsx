import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "lacrochet-cart";
const MAX_QUANTITY = 99;

function getProductId(product) {
  return product?.id ?? product?.product_id ?? product?.productId;
}

function sameId(firstId, secondId) {
  return String(firstId) === String(secondId);
}

function getSavedCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(savedCart)) {
      return [];
    }

    return savedCart.flatMap((item) => {
      if (!item || typeof item !== "object") {
        return [];
      }

      const nestedProduct = item.product ?? {};
      const id =
        getProductId(item) ??
        getProductId(nestedProduct);

      const name =
        item.name ??
        nestedProduct.name ??
        nestedProduct.product_name;

      const price = Number(item.price ?? nestedProduct.price);
      const quantity = Number(item.quantity);

      // Discard old or incomplete entries that cannot be sent to checkout.
      if (
        id == null ||
        !Number.isFinite(price) ||
        !Number.isFinite(quantity)
      ) {
        return [];
      }

      return [
        {
          id,
          name: name ?? "Product",
          image: item.image ?? nestedProduct.image ?? null,
          price,
          quantity: Math.min(
            MAX_QUANTITY,
            Math.max(1, Math.floor(quantity))
          ),
        },
      ];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, quantity = 1) {
    const productId = getProductId(product);

    if (productId == null) {
      console.error("Cannot add product without an ID:", product);
      return;
    }

    const price = Number(product.price);

    if (!Number.isFinite(price)) {
      console.error("Cannot add product with an invalid price:", product);
      return;
    }

    const amount = Math.min(
      MAX_QUANTITY,
      Math.max(1, Math.floor(Number(quantity) || 1))
    );

    const cartProduct = {
      id: productId,
      name: product.name ?? product.product_name ?? "Product",
      image: product.image ?? product.image_url ?? null,
      price,
      quantity: amount,
    };

    setCartItems((items) => {
      // Also remove any invalid entries left in the current in-memory cart.
      const validItems = items.filter((item) => item?.id != null);
      const existingItem = validItems.find((item) =>
        sameId(item.id, productId)
      );

      if (existingItem) {
        return validItems.map((item) =>
          sameId(item.id, productId)
            ? {
                ...item,
                quantity: Math.min(
                  MAX_QUANTITY,
                  item.quantity + amount
                ),
              }
            : item
        );
      }

      return [...validItems, cartProduct];
    });
  }

  function changeQuantity(productId, amount) {
    setCartItems((items) =>
      items.map((item) =>
        sameId(item.id, productId)
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                Math.max(1, item.quantity + (Number(amount) || 0))
              ),
            }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartItems((items) =>
      items.filter((item) => !sameId(item.id, productId))
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
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