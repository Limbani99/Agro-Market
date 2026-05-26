import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useData } from "../context/DataProvider";
import {
  LayoutDashboard,
  ShoppingBag,
  Boxes,
  BarChart3,
  ClipboardList,
  PlusCircle,
  Settings,
  HelpCircle,
  Search,
  Bell,
  MessageSquare,
  X,
  Plus,
  Wallet,
  LogOut,
  User
} from "lucide-react";

export default function Layout() {
  const { stats, addNewProduct, sellerInfo, user, logout, authChecked } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Vegetables",
    description: "",
    image: ""
  });
  const navigate = useNavigate();

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#FDFDFB] flex items-center justify-center font-body">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 border-4 border-[#3F704D] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm">Verifying Grower Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const success = await addNewProduct(newProduct);
    if (success) {
      setNewProduct({ name: "", price: "", stock: "", category: "Vegetables", description: "", image: "" });
      setIsModalOpen(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Marketplace", path: "/marketplace", icon: ShoppingBag },
    { name: "Products Catalog", path: "/products", icon: Boxes },
    { name: "Orders Tracker", path: "/orders", icon: ClipboardList },
    { name: "Earnings Wallet", path: "/earnings", icon: Wallet },
    { name: "Sales Ledger", path: "/sales", icon: BarChart3 },
    { name: "Customer Reviews", path: "/reviews", icon: MessageSquare }
  ];

  const bottomItems = [
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Support Guide", path: "/support", icon: HelpCircle }
  ];

  return (
    <div className="flex min-h-screen bg-bg-light">
      {/* SIDEBAR */}
      <aside className="w-64 bg-sidebar-bg border-r border-[#E2DFD3] flex flex-col justify-between fixed top-0 bottom-0 left-0 z-30">
        <div>
          {/* Logo Header */}
          <div className="p-6 pb-4">
            <Link to="/" className="block">
              <h1 className="font-serif text-[26px] leading-8 font-bold text-primary tracking-tight">
                Terra Agro
              </h1>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase mt-0.5">
                {user?.farmName}
              </p>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex flex-col gap-0.5 max-h-[50vh] overflow-y-auto no-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item?.name}
                to={item?.path}
                className={({ isActive }) => `
                  flex items-center justify-between py-3 pl-6 pr-4 font-semibold text-[14.5px] transition-all relative
                  ${isActive
                    ? "text-primary bg-bg-light/40 border-r-4 border-primary font-bold"
                    : "text-slate-600 hover:text-primary hover:bg-bg-light/20"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-[18px] h-[18px] stroke-[2px]" />
                  <span>{item?.name}</span>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions & Footer Items */}
        <div className="p-4 flex flex-col gap-4">
          {/* Capsule Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#3F704D] hover:bg-primary-dark text-white rounded-full font-semibold shadow-sm transition-all duration-200 active:scale-95 text-[14px]"
          >
            <Plus className="w-[18px] h-[18px] stroke-[3px]" />
            <span>List New Product</span>
          </button>

          {/* Settings, Support, and Logout Links */}
          <div className="flex flex-col gap-0.5 pt-2 border-t border-[#E2DFD3]">
            {bottomItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 py-2 px-4 font-medium text-[13.5px] rounded-lg transition-all
                  ${isActive
                    ? "text-primary bg-bg-light/40 font-bold"
                    : "text-slate-600 hover:text-primary hover:bg-bg-light/20"
                  }
                `}
              >
                <item.icon className="w-[17px] h-[17px]" />
                <span>{item.name}</span>
              </NavLink>
            ))}

            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-3 py-2 px-4 font-medium text-[13.5px] rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all text-left w-full mt-1"
            >
              <LogOut className="w-[17px] h-[17px]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* HEADER NAVBAR */}
        <header className="h-[76px] px-8 bg-bg-light flex items-center justify-between border-b border-[#EBE8DE] sticky top-0 z-20">
          {/* Search bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders, stock..."
              className="w-full pl-10 pr-4 py-2 text-[14px] bg-[#EAE6DB]/40 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder-slate-500 font-medium"
            />
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-6">
            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-[#EAE6DB]/40 rounded-full relative transition-colors text-slate-700"
              >
                <Bell className="w-5 h-5 stroke-[2.2px]" />
                {stats.unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#D9534F] text-white text-[9px] font-bold rounded-full border border-bg-light flex items-center justify-center">
                    {stats.unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-[#E9E6DC] py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#F0EDE6] flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-[14px]">Notifications</h4>
                      <span className="text-[11px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                        {stats.unreadNotifications} New
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {stats.lowStockAlerts > 0 && (
                        <div className="px-4 py-3 hover:bg-[#F8F6F0] flex gap-3 border-b border-[#F0EDE6] cursor-pointer" onClick={() => { navigate("/products"); setShowNotifications(false); }}>
                          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                            <Boxes className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[12.5px] font-semibold text-slate-800">Low Stock Alert</p>
                            <p className="text-[11.5px] text-slate-500 mt-0.5">Fresh Farm Eggs has only 3 units left.</p>
                          </div>
                        </div>
                      )}
                      <div className="px-4 py-3 hover:bg-[#F8F6F0] flex gap-3 border-b border-[#F0EDE6] cursor-pointer" onClick={() => { navigate("/orders"); setShowNotifications(false); }}>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-slate-800">New Pending Order</p>
                          <p className="text-[11.5px] text-slate-500 mt-0.5">ORD-2854 from Oliver Taylor needs review.</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="block text-center py-2.5 text-xs font-bold text-primary hover:bg-[#F8F6F0] rounded-b-2xl border-t border-[#F0EDE6]"
                    >
                      View All Alerts
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Chat Icon */}
            <button className="p-2 hover:bg-[#EAE6DB]/40 rounded-full text-slate-700 transition-colors" onClick={() => navigate("/support")}>
              <MessageSquare className="w-5 h-5 stroke-[2.2px]" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3.5 pl-4 border-l border-[#EBE8DE] text-left hover:opacity-85 transition-opacity"
              >
                <div>
                  <p className="font-bold text-slate-800 text-[14.5px] leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-700 leading-none mt-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full inline-block">
                    {user.type}
                  </p>
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E9E6DC] shadow-sm"
                />
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-[#E9E6DC] py-2 z-45 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-semibold text-slate-700 hover:bg-[#F8F6F0] transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-semibold text-slate-700 hover:bg-[#F8F6F0] transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-[#F0EDE6] my-1" />
                    <button
                      onClick={() => { handleLogoutClick(); setShowProfileMenu(false); }}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-bold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGES MAIN CONTENT */}
        <main className="flex-1 p-8 bg-bg-light">
          <Outlet />
        </main>
      </div>

      {/* LIST NEW PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-[480px] p-8 shadow-2xl border border-[#E9E6DC] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-slate-800">List New Farm Product</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="flex flex-col gap-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Honey Crisp Apples"
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 5.50"
                    className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Stock Qty</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25"
                    className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Category</label>
                <select
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Dairy & Eggs">Dairy & Eggs</option>
                  <option value="Pantry">Pantry</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  rows={2}
                  placeholder="Tell buyers about this organic item..."
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 leading-relaxed"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="Leave empty for generic farm image"
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3F704D] hover:bg-primary-dark text-white rounded-full font-bold shadow-sm transition-all duration-200 mt-2 active:scale-95"
              >
                Create Product Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
