import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from "./Router";
import './index.css'
// import App from './App.jsx'

import { CartProvider } from "./context/CartContext";

import LandingPage from './pages/LandingPage';

// IMPORT HERE FOR PAGE TESTING
import ProductPage from './pages/ProductPage.jsx';
import Cart from './pages/Cart.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirm from './pages/OrderConfirmationPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <CartProvider>
        {/* <LandingPage /> */}
        {/* <ProductPage /> */}
        {/* <Cart/> */}
        {/* <CheckoutPage/> */}
        {/* <OrderConfirm/> */}
        <Router/>
      </CartProvider>
    </>
  </StrictMode>,
)
