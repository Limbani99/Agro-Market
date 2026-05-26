import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper: map a raw DB order to Seller UI shape
const mapDbOrderToSeller = (dbOrder, sellerId) => {
  const myProducts = (dbOrder.products || []).filter(p => {
    const prod = p.product;
    if (!prod) return false;
    return prod.sellerId === sellerId || (prod.sellerId && (prod.sellerId._id === sellerId || prod.sellerId.id === sellerId));
  });

  if (myProducts.length === 0) return null;

  const myAmount = myProducts.reduce((sum, p) => sum + (Number(p.product?.price || 0) * p.quantity), 0);
  const firstProduct = myProducts[0]?.product;
  const productName = firstProduct ? firstProduct.name : 'Harvest Item';
  const displayProduct = myProducts.length > 1 
      ? `${productName} + ${myProducts.length - 1} more` 
      : productName;

  const items = myProducts.map(p => ({
      name: p.product?.name || 'Harvest Item',
      qty: p.quantity,
      price: Number(p.product?.price || 0)
  }));

  const customerName = dbOrder.user?.name || 'Agro Market Buyer';
  const initials = customerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return {
      id: dbOrder._id,
      initials,
      customer: customerName,
      email: dbOrder.user?.email || 'buyer@marketplace.com',
      product: displayProduct,
      items,
      status: dbOrder.status,
      amount: myAmount,
      address: dbOrder.shippingAddress || dbOrder.user?.address || 'USA',
      phone: dbOrder.phone || dbOrder.user?.phone || 'N/A',
      date: new Date(dbOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
};

// Helper: map a raw DB review to Seller UI shape
const mapDbReviewToSeller = (dbReview) => {
  return {
    id: dbReview._id,
    author: dbReview.user?.name || 'Agro Market Buyer',
    product: dbReview.product?.name || 'Deleted Product',
    rating: dbReview.rating,
    comment: dbReview.comment,
    reply: dbReview.reply,
    date: new Date(dbReview.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
};

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setrole] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const login = (userData, token) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    setrole(null);
    setOrders([]);
    setProducts([]);
    setReviews([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const savedUserStr =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    
    let parsedUser = null;
    let savedRole = null;

    try {
      if (savedUserStr && savedUserStr !== "undefined" && savedUserStr !== "null") {
        parsedUser = JSON.parse(savedUserStr);
        savedRole = parsedUser ? parsedUser.role : null;
      }
    } catch (e) {
      console.error("Error parsing saved user", e);
    }

    if (savedToken && parsedUser) {
      setUser(parsedUser);
      setToken(savedToken);
      setrole(savedRole);
    } else {
      setUser(null);
      setToken(null);
      setrole(null);
    }

    setAuthChecked(true);
  }, []);

  // Axios request/response interceptor for token & auth state
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
          setToken(null);
          setrole(null);
          setOrders([]);
          setProducts([]);
          setReviews([]);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      const mapped = res.data.map(p => ({
        ...p,
        id: p._id,
        sales: p.sales || Math.floor(Math.random() * 20) + 5,
        rating: p.rating || 4.5,
        image: p.images && p.images.length > 0 ? p.images[0] : "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200"
      }));
      const savedUser = localStorage.getItem("user");
      let currentUserId = user?._id || user?.id;
      if (!currentUserId && savedUser && savedUser !== "undefined" && savedUser !== "null") {
        try {
          const parsed = JSON.parse(savedUser);
          currentUserId = parsed?._id || parsed?.id;
        } catch (e) {
          console.error("Error parsing savedUser in fetchProducts", e);
        }
      }
      if (currentUserId) {
        setProducts(mapped.filter(p => p.sellerId === currentUserId || (p.sellerId && (p.sellerId._id === currentUserId || p.sellerId.id === currentUserId))));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const savedUser = localStorage.getItem("user");
      let currentUserId = user?._id || user?.id;
      if (!currentUserId && savedUser && savedUser !== "undefined" && savedUser !== "null") {
        try {
          const parsed = JSON.parse(savedUser);
          currentUserId = parsed?._id || parsed?.id;
        } catch (e) {
          console.error("Error parsing savedUser in fetchOrders", e);
        }
      }
      
      if (currentUserId) {
        const res = await axios.get(`${API}/order/seller`);
        const mapped = res.data.map(o => mapDbOrderToSeller(o, currentUserId)).filter(Boolean);
        setOrders(mapped);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching seller orders", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const savedUser = localStorage.getItem("user");
      let currentUserId = user?._id || user?.id;
      if (!currentUserId && savedUser && savedUser !== "undefined" && savedUser !== "null") {
        try {
          const parsed = JSON.parse(savedUser);
          currentUserId = parsed?._id || parsed?.id;
        } catch (e) {
          console.error("Error parsing savedUser in fetchReviews", e);
        }
      }
      
      if (currentUserId) {
        const res = await axios.get(`${API}/reviews/seller`);
        const mapped = res.data.map(mapDbReviewToSeller);
        setReviews(mapped);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching seller reviews", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const savedUser = localStorage.getItem("user");
      let currentUserId = user?._id || user?.id;
      if (!currentUserId && savedUser && savedUser !== "undefined" && savedUser !== "null") {
        try {
          const parsed = JSON.parse(savedUser);
          currentUserId = parsed?._id || parsed?.id;
        } catch (e) {
          console.error("Error parsing savedUser in fetchNotifications", e);
        }
      }
      
      if (currentUserId) {
        const res = await axios.get(`${API}/notifications`);
        const mapped = res.data.map(n => ({
          id: n._id,
          type: n.type || 'general',
          title: n.title || 'Farm Alert',
          desc: n.message || '',
          read: n.isRead,
          date: new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        setNotifications(mapped);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const markNotificationRead = async (id) => {
    try {
      await axios.put(`${API}/notifications/read/${id}`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error("Error marking notification read:", error);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await axios.put(`${API}/notifications/read-all`);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all notifications read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API}/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (user || savedUser) {
      fetchProducts();
      fetchOrders();
      fetchReviews();
      fetchNotifications();

      // Load or seed withdrawals dynamically based on currentUserId
      let currentUserId = user?._id || user?.id;
      if (!currentUserId && savedUser && savedUser !== "undefined" && savedUser !== "null") {
        try {
          const parsed = JSON.parse(savedUser);
          currentUserId = parsed?._id || parsed?.id;
        } catch (e) {
          console.error("Error parsing savedUser in withdrawals loading", e);
        }
      }
      if (currentUserId) {
        const saved = localStorage.getItem(`withdrawals_${currentUserId}`);
        if (saved) {
          setWithdrawals(JSON.parse(saved));
        } else {
          const initialWithdrawals = [
            {
              id: "WTH-E7A94B",
              date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              bank: "Chase ****4920",
              status: "Completed",
              amount: 350.00
            },
            {
              id: "WTH-4A82F1",
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              bank: "Chase ****4920",
              status: "Completed",
              amount: 480.00
            }
          ];
          localStorage.setItem(`withdrawals_${currentUserId}`, JSON.stringify(initialWithdrawals));
          setWithdrawals(initialWithdrawals);
        }
      }
    } else {
      setProducts([]);
      setOrders([]);
      setReviews([]);
      setNotifications([]);
      setWithdrawals([]);
    }
  }, [user]);

  const addNewProduct = async (productData) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("description", productData.description || "");
      
      if (productData.imageFiles) {
        productData.imageFiles.forEach((file) => {
          if (file) {
            formData.append("images", file);
          }
        });
      } else if (productData.image) {
        formData.append("images", productData.image);
      }
      
      await axios.post(`${API}/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error adding product", error);
      alert(error.response?.data?.message || "Error adding product");
      return false;
    }
  };

  const updateProduct = async (productData) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("description", productData.description || "");
      formData.append("images", JSON.stringify(productData.images || []));
      
      if (productData.imageFiles) {
        productData.imageFiles.forEach((file) => {
          if (file) {
            formData.append("images", file);
          }
        });
      }
      
      await axios.put(`${API}/products/update/${productData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error updating product", error);
      alert(error.response?.data?.message || "Error updating product");
      return false;
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this listing?")) return false;
    try {
      await axios.delete(`${API}/products/delete/${id}`);
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error deleting product", error);
      alert(error.response?.data?.message || "Error deleting product");
      return false;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API}/order/update/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      alert(error.response?.data?.message || "Failed to update status");
      return false;
    }
  };

  const addReviewReply = async (reviewId, text) => {
    try {
      await axios.put(`${API}/reviews/reply/${reviewId}`, { reply: text });
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: text } : r));
      return true;
    } catch (error) {
      console.error("Error replying to review:", error);
      alert(error.response?.data?.message || "Failed to submit reply");
      return false;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("farmName", profileData.farmName);
      formData.append("location", profileData.location);
      formData.append("bio", profileData.bio);
      formData.append("email", profileData.email);

      if (profileData.imageFile) {
        formData.append("avatar", profileData.imageFile);
      } else if (profileData.avatar) {
        formData.append("avatar", profileData.avatar);
      }

      const res = await axios.put(`${API}/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating profile", error);
      alert(error.response?.data?.message || "Failed to update profile");
      return false;
    }
  };

  const requestWithdrawal = (amount, bank) => {
    const savedUser = localStorage.getItem("user");
    let currentUserId = user?._id || user?.id;
    if (!currentUserId && savedUser && savedUser !== "undefined" && savedUser !== "null") {
      try {
        const parsed = JSON.parse(savedUser);
        currentUserId = parsed?._id || parsed?.id;
      } catch (e) {
        console.error("Error parsing savedUser in requestWithdrawal", e);
      }
    }
    if (!currentUserId) return false;

    const newWithdrawal = {
      id: `WTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      bank,
      status: "Processing",
      amount
    };

    const updated = [newWithdrawal, ...withdrawals];
    setWithdrawals(updated);
    localStorage.setItem(`withdrawals_${currentUserId}`, JSON.stringify(updated));
    return true;
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    try {
      await axios.put(`${API}/users/change-password`, {
        currentPassword,
        newPassword
      });
      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "Failed to update password");
      return false;
    }
  };

  const totalSales = orders.filter(o => o.status === "Delivered" || o.status === "Shipped").reduce((sum, o) => sum + o.amount, 0);
  const rawEarnings = totalSales * 0.9;
  const totalWithdrawn = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const remainingEarnings = Math.max(rawEarnings - totalWithdrawn, 0);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalSales,
    totalEarnings: remainingEarnings,
    rawEarnings,
    totalWithdrawn,
    pendingOrders: orders.filter(o => o.status === "Pending").length,
    lowStockAlerts: products.filter(p => p.stock <= 5).length,
    unreadNotifications: notifications.filter(n => !n.read).length
  };

  const userWithDefaults = user ? {
    ...user,
    type: user.role === "farmer" ? "Farmer" : user.role,
    avatar: user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`,
    farmName: user.farmName || "Agro Market",
    bio: user.bio || "Regenerative organic small-scale family farm committed to cultivating premium, fresh, chemical-free crops for our local community.",
    location: user.location || "California Valley Organic Acres, USA"
  } : null;

  const value = {
    user: userWithDefaults,
    token,
    role,
    login,
    logout,
    products,
    fetchProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
    orders,
    fetchOrders,
    updateOrderStatus,
    reviews,
    fetchReviews,
    addReviewReply,
    updateProfile,
    notifications,
    fetchNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    stats,
    withdrawals,
    requestWithdrawal,
    changeUserPassword,
    isAuthenticated: !!token,
    authChecked
  };
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext)
  return context;
}

