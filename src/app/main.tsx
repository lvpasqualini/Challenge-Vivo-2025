import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import  router  from '../router/router'
import { RouterProvider } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
      <RouterProvider router={router} />
    <Footer/>
  </StrictMode>
)