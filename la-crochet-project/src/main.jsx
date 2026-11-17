import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Header from './Components/Header.jsx'
import LandingPage from './pages/LandingPage';

// IMPORT HERE FOR PAGE TESTING
import ProductPage from './pages/ProductPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      {/* <LandingPage /> */}
      <ProductPage />
    </>
  </StrictMode>,
)
