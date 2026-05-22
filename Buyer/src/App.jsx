import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import FarmerProfile from './pages/FarmerProfile'
import Cart from './pages/Cart'
import BuyerProfile from './pages/BuyerProfile'
import Farmers from './pages/Farmers'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './auth/Login'
import Register from './auth/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="farmer/:id" element={<FarmerProfile />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<BuyerProfile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}



export default App