import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Header from './Components/Header.jsx'
import LandingPage from './pages/LandingPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      {/* <Header /> */}
      <LandingPage />
    </>
  </StrictMode>,
)
