import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./layout/Layout";

// Public Pages
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./pages/NotFound";

// Secured Pages
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Products from "./pages/product/Products";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import ProductDetails from "./pages/product/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Sales from "./pages/Sales";
import Analytics from "./pages/Analytics";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Earnings from "./pages/Earnings";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="marketplace" element={<Marketplace />} />

        {/* Product Catalog */}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />

        {/* Order tracking */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />

        {/* Ledger & metrics */}
        <Route path="sales" element={<Sales />} />
        <Route path="analytics" element={<Analytics />} />

        {/* User profile */}
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />

        {/* Feedback & Systems */}
        <Route path="reviews" element={<Reviews />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<HelpSupport />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

