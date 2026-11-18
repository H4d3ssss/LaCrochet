import { BrowserRouter, Routes, Route } from "react-router";

import CatalogPage from "./pages/CatalogPage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import SignupForm from "./components/auth/SignupForm";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

export default function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignupForm />} />
            {/* <Route path="/products/:productId" element={<ProductPage />} /> */}
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Routes>
        </BrowserRouter>
    )
}