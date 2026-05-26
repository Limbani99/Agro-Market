import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './context/DataProvider.jsx'
import { Toaster } from 'react-hot-toast';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000, className: "bg-primary text-white border border-primary" }} />
        <App />
      </BrowserRouter>
    </DataProvider>
  </StrictMode>,
)


