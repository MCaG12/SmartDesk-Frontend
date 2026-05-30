import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginScreen from './pages/loginscreen.tsx'
import DashScreenScreen from './pages/dashboardscreen.tsx'

const router = createBrowserRouter(
  [
    { path: '/', element: < LoginScreen />, },
    { path: '/dashboard', element: < DashScreenScreen />}
  ]
) 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
