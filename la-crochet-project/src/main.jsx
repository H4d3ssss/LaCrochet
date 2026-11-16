import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import LandingPage from './LandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Header />
    <LandingPage />
    <Footer />
    </>
  </StrictMode>,
)
