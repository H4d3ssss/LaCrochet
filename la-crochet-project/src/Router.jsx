import { BrowserRouter, Routes, Route } from "react-router";

// import CatalogPage from "./pages/CatalogPage";
// import LandingPage from "./pages/LandingPage";
// import ProductPage from "./pages/ProductPage";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
import SignupForm from "./components/auth/SignupForm";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

export default function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignupForm />} />
            {/* <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Routes>
        </BrowserRouter>
    )
}