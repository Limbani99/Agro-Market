import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setrole] = useState(null)
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

  // Axios request interceptor for token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 2854,
      initials: "OT",
      customer: "Oliver Taylor",
      product: "Crisp Honeycrisp Apples",
      status: "Pending",
      amount: 110.00,
      date: "May 24, 2026"
    },
    {
      id: 2853,
      initials: "MS",
      customer: "Maria Silva",
      product: "Organic Heirloom Tomatoes",
      status: "Shipped",
      amount: 85.50,
      date: "May 23, 2026"
    },
    {
      id: 2852,
      initials: "JD",
      customer: "John Doe",
      product: "Fresh Farm Eggs",
      status: "Delivered",
      amount: 45.00,
      date: "May 22, 2026"
    }
  ]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Jane Smith",
      product: "Crisp Honeycrisp Apples",
      rating: 5,
      date: "May 24, 2026",
      comment: "These apples were super crisp and sweet! Definitely buying again.",
      reply: "Thank you for the review, Jane! Glad you liked them."
    },
    {
      id: 2,
      author: "Robert Johnson",
      product: "Organic Heirloom Tomatoes",
      rating: 4,
      date: "May 23, 2026",
      comment: "Very juicy and full of flavor. One or two were slightly bruised in transit, but overall excellent quality.",
      reply: ""
    }
  ]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (user || savedUser) {
      fetchProducts();
    } else {
      setProducts([]);
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
      
      await axios.post("http://localhost:5000/api/products/add", formData, {
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
      
      await axios.put(`http://localhost:5000/api/products/update/${productData.id}`, formData, {
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
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error deleting product", error);
      alert(error.response?.data?.message || "Error deleting product");
      return false;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const addReviewReply = (reviewId, text) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: text } : r));
  };

  const totalSales = orders.filter(o => o.status === "Delivered" || o.status === "Shipped").reduce((sum, o) => sum + o.amount, 0);
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalSales,
    totalEarnings: totalSales * 0.9,
    pendingOrders: orders.filter(o => o.status === "Pending").length,
    lowStockAlerts: products.filter(p => p.stock <= 5).length,
    unreadNotifications: 2
  };

  const userWithDefaults = user ? {
    ...user,
    type: user.role === "farmer" ? "Farmer" : user.role,
    avatar: user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`,
    farmName: user.farmName || "Terra Agro"
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
    updateOrderStatus,
    reviews,
    addReviewReply,
    stats,
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