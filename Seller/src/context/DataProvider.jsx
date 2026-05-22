import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const DataContext = createContext();

const isMongoId = (id) => {
  return typeof id === "string" && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id);
};

export function DataProvider({ children }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Logged in by default for smooth demo
  const [user, setUser] = useState({
    name: "James Miller",
    email: "james.miller@greenvalley.com",
    farmName: "Green Valley Farm",
    type: "Verified Seller",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    bio: "Producing premium-quality organic vegetables, fresh honeycombs, and free-range farm eggs in the heart of Valley Crest since 2012.",
    location: "482 Organic Way, Valley Crest, CA",
    category: "Mixed Pantry"
  });

  // Mock Products List
  const [products, setProducts] = useState([
    { id: 1, name: "Organic Kale", price: 6.00, stock: 45, sales: 842, rating: 4.8, category: "Vegetables", status: "In Stock", description: "Freshly harvested organic curly kale. Excellent source of vitamins A, C, and K. Perfect for salads and smoothies.", image: "https://images.unsplash.com/photo-1628773822503-930a84e6f477?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1628773822503-930a84e6f477?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200"] },
    { id: 2, name: "Heirloom Tomatoes", price: 4.50, stock: 60, sales: 612, rating: 5.0, category: "Vegetables", status: "In Stock", description: "Succulent and sweet, colorful heirloom tomato varieties. Earthy, rich flavor grown without synthetic fertilizer.", image: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1607305387299-a3d9611cd46f?auto=format&fit=crop&q=80&w=200"] },
    { id: 3, name: "Mixed Berry Box", price: 15.00, stock: 12, sales: 245, rating: 4.9, category: "Fruits", status: "In Stock", description: "A healthy mix of organic strawberries, blueberries, and blackberries. High in antioxidants.", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1488900128323-24dd0df35d7d?auto=format&fit=crop&q=80&w=200"] },
    { id: 4, name: "Sweet Honeycomb (500g)", price: 18.00, stock: 25, sales: 189, rating: 4.7, category: "Pantry", status: "In Stock", description: "100% pure raw honeycomb harvested from wildflower fields. Unfiltered and unpasteurized.", image: "https://images.unsplash.com/photo-1471947186979-68d455762c62?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1471947186979-68d455762c62?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1470058869855-412f56c3cc33?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=200"] },
    { id: 5, name: "Fresh Farm Eggs (Dozen)", price: 6.00, stock: 3, sales: 320, rating: 4.6, category: "Dairy & Eggs", status: "Low Stock", description: "Free-range pasture raised organic eggs. Rich amber yolks from happy, healthy chickens.", image: "https://images.unsplash.com/photo-1516448424440-9dbca97779c1?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1516448424440-9dbca97779c1?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1582722872445-44c5e7e36888?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=200"] },
    { id: 6, name: "Organic Baby Spinach", price: 5.50, stock: 35, sales: 154, rating: 4.5, category: "Vegetables", status: "In Stock", description: "Pre-washed, tender organic baby spinach leaves. Mild, sweet taste perfect for nutrition-packed recipes.", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1474447976863-67d191d95485?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1488459718432-36a85e089401?auto=format&fit=crop&q=80&w=200"] },
    { id: 7, name: "Whole Grain Oat Flour", price: 9.00, stock: 18, sales: 98, rating: 4.4, category: "Pantry", status: "In Stock", description: "Gluten-free, stone-ground whole oats flour. Provides rich fiber and premium texture for organic baking.", image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=200"] },
    { id: 8, name: "Lavender Honey Jar", price: 14.50, stock: 0, sales: 76, rating: 4.8, category: "Pantry", status: "Out of Stock", description: "Infused with pure French lavender fields fragrance. Offers a sweet floral honey flavor notes.", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200", images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1471947186979-68d455762c62?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=200", "https://images.unsplash.com/photo-1470058869855-412f56c3cc33?auto=format&fit=crop&q=80&w=200"] }
  ]);

  const [totalProductsOffset, setTotalProductsOffset] = useState(16);

  // Helper function to fetch products from database
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      if (response.data && Array.isArray(response.data)) {
        if (response.data.length > 0) {
          const mapped = response.data.map(p => {
            const hasImages = p.images && p.images.length > 0;
            const imagesList = hasImages ? p.images : [p.image || "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200"];
            
            // Auto fill up to 4 images if fewer are returned, using high quality stock photos
            while (imagesList.length < 4) {
              imagesList.push("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200");
            }

            return {
              id: p._id || p.id,
              name: p.name,
              price: parseFloat(p.price) || 0.0,
              stock: parseInt(p.stock) || 0,
              sales: p.sales || 0,
              rating: p.rating || 5.0,
              category: p.category || "Vegetables",
              status: p.stock === 0 ? "Out of Stock" : (p.stock <= 5 ? "Low Stock" : "In Stock"),
              description: p.description || "",
              image: imagesList[0],
              images: imagesList
            };
          });
          setProducts(mapped);
        }
      }
    } catch (error) {
      console.error("Error fetching products from backend:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Mock Orders List
  const [orders, setOrders] = useState([
    { id: "ORD-2849", customer: "Emily Lawson", initials: "EL", product: "Mixed Berry Box", status: "Delivered", amount: 45.00, date: "2026-05-22", email: "emily@lawson.com", address: "782 Pine Valley, Los Angeles, CA", items: [{ name: "Mixed Berry Box", qty: 3, price: 15.00 }] },
    { id: "ORD-2850", customer: "Marcus King", initials: "MK", product: "Organic Kale (2kg)", status: "Shipped", amount: 22.40, date: "2026-05-22", email: "marcus@king.com", address: "109 Sunset Blvd, San Francisco, CA", items: [{ name: "Organic Kale (2kg)", qty: 2, price: 11.20 }] },
    { id: "ORD-2851", customer: "Sarah Thompson", initials: "ST", product: "Heirloom Tomatoes", status: "Pending", amount: 18.00, date: "2026-05-21", email: "sarah.t@gmail.com", address: "354 Oak St, San Diego, CA", items: [{ name: "Heirloom Tomatoes", qty: 4, price: 4.50 }] },
    { id: "ORD-2852", customer: "David Chen", initials: "DC", product: "Sweet Honeycomb (500g)", status: "Delivered", amount: 36.00, date: "2026-05-20", email: "dchen@tech.com", address: "891 Bayview Dr, Seattle, WA", items: [{ name: "Sweet Honeycomb (500g)", qty: 2, price: 18.00 }] },
    { id: "ORD-2853", customer: "Sophia Martinez", initials: "SM", product: "Fresh Farm Eggs (Dozen)", status: "Pending", amount: 12.00, date: "2026-05-19", email: "sophia@martinez.com", address: "234 Maple Ave, Sacramento, CA", items: [{ name: "Fresh Farm Eggs (Dozen)", qty: 2, price: 6.00 }] },
    { id: "ORD-2854", customer: "Oliver Taylor", initials: "OT", product: "Organic Baby Spinach", status: "Pending", amount: 11.00, date: "2026-05-18", email: "oliver@taylor.com", address: "678 Hilltop Ln, Portland, OR", items: [{ name: "Organic Baby Spinach", qty: 2, price: 5.50 }] }
  ]);

  const [totalOrdersOffset, setTotalOrdersOffset] = useState(150);
  const [totalSales, setTotalSales] = useState(12450);
  const [totalEarnings, setTotalEarnings] = useState(9820);

  // Mock Reviews & Replies
  const [reviews, setReviews] = useState([
    { id: 1, author: "Anna S.", rating: 5, comment: "Best tomatoes I've had in years. The taste is incredibly sweet and earthy. Highly recommend!", date: "2026-05-22", product: "Heirloom Tomatoes", reply: null },
    { id: 2, author: "David K.", rating: 5, comment: "The kale was fresh, clean, and delicious in my morning smoothies. Excellent quality!", date: "2026-05-21", product: "Organic Kale", reply: null },
    { id: 3, author: "Linda M.", rating: 4, comment: "Very fast shipping. Honeycomb is top-tier. Will order more next season.", date: "2026-05-20", product: "Sweet Honeycomb (500g)", reply: "Thank you Linda! We look forward to serving you soon!" }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, type: "stock", title: "Low Stock Alert", desc: "Fresh Farm Eggs (Dozen) has only 3 left in stock.", date: "10 mins ago", read: false },
    { id: 2, type: "order", title: "New Pending Order", desc: "ORD-2854 from Oliver Taylor needs review.", date: "1 hour ago", read: false },
    { id: 3, type: "review", title: "5-Star Review Received", desc: "Anna S. left a review on Heirloom Tomatoes.", date: "2 hours ago", read: true },
    { id: 4, type: "payout", title: "Withdrawal Completed", desc: "Your withdrawal of $1,250 has been settled.", date: "Yesterday", read: true }
  ]);

  // Withdrawal logs
  const [withdrawals, setWithdrawals] = useState([
    { id: "WTH-921", date: "2026-05-10", bank: "Chase ****4920", amount: 1250, status: "Completed" },
    { id: "WTH-902", date: "2026-04-28", bank: "Chase ****4920", amount: 2000, status: "Completed" },
    { id: "WTH-885", date: "2026-04-12", bank: "Chase ****4920", amount: 1500, status: "Completed" }
  ]);

  // Derived alert stats
  const stats = useMemo(() => {
    const totalProductsCount = products.length + totalProductsOffset;
    const totalOrdersCount = orders.length + totalOrdersOffset;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const pendingOrdersCount = orders.filter(o => o.status === "Pending").length;
    const unreadNotifications = notifications.filter(n => !n.read).length;

    return {
      totalProducts: totalProductsCount,
      totalOrders: totalOrdersCount,
      totalSales: totalSales,
      totalEarnings: totalEarnings,
      lowStockAlerts: lowStockCount,
      pendingOrders: pendingOrdersCount,
      unreadNotifications
    };
  }, [products, orders, totalProductsOffset, totalOrdersOffset, totalSales, totalEarnings, notifications]);

  // Auth Operations
  const login = (email, password) => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return false;
    }
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email
    }));
    toast.success("Welcome back to Terra Agro!");
    return true;
  };

  const register = (data) => {
    if (!data.name || !data.email || !data.farmName || !data.password) {
      toast.error("Please fill all required registration details");
      return false;
    }
    setIsAuthenticated(true);
    setUser({
      name: data.name,
      email: data.email,
      farmName: data.farmName,
      type: "Verified Seller",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      bio: `Fresh farm produce direct from ${data.farmName}. Welcome to our digital organic storefront.`,
      location: data.location || "California Valley Organic Acres",
      category: data.category || "Vegetables"
    });
    toast.success("Account created! Welcome to Terra Agro!");
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const updateProfile = (data) => {
    setUser(prev => ({
      ...prev,
      ...data
    }));
    toast.success("Farm profile updated successfully!");
  };

  // Product Operations
  const addNewProduct = async (product) => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description || "Fresh harvested high-quality farm produce.");
      formData.append("price", parseFloat(product.price) || 0.0);
      formData.append("stock", parseInt(product.stock) || 0);
      formData.append("category", product.category || "Vegetables");
      
      if (product.imageFiles && product.imageFiles.length > 0) {
        product.imageFiles.forEach(file => {
          if (file) {
            formData.append("images", file);
          }
        });
      }

      const response = await axios.post("http://localhost:5000/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 201 || response.status === 200) {
        const savedProduct = response.data;
        const imagesList = savedProduct.images && savedProduct.images.length > 0
          ? savedProduct.images
          : ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200"];
        while (imagesList.length < 4) {
          imagesList.push("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200");
        }

        const item = {
          id: savedProduct._id || savedProduct.id || (products.length + 1),
          name: savedProduct.name,
          price: savedProduct.price,
          stock: savedProduct.stock,
          category: savedProduct.category,
          description: savedProduct.description,
          sales: 0,
          rating: 5.0,
          status: savedProduct.stock === 0 ? "Out of Stock" : (savedProduct.stock <= 5 ? "Low Stock" : "In Stock"),
          image: imagesList[0],
          images: imagesList
        };

        setProducts([item, ...products]);
        toast.success(`${product.name} listed successfully in database!`);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding product to backend:", error);
      const errorMsg = error.response?.data?.message || "Failed to list crop in database.";
      toast.error(errorMsg);
      return false;
    }
  };

  const updateProduct = async (updatedProduct) => {
    const productId = updatedProduct.id;
    if (isMongoId(productId)) {
      try {
        const formData = new FormData();
        formData.append("name", updatedProduct.name);
        formData.append("description", updatedProduct.description);
        formData.append("price", parseFloat(updatedProduct.price) || 0.0);
        formData.append("category", updatedProduct.category);
        formData.append("stock", parseInt(updatedProduct.stock) || 0);

        if (updatedProduct.images && updatedProduct.images.length > 0) {
          // Filter out temporary blob urls before saving
          const filteredImages = updatedProduct.images.filter(img => !img.startsWith("blob:"));
          formData.append("images", JSON.stringify(filteredImages));
        }

        if (updatedProduct.imageFiles && updatedProduct.imageFiles.length > 0) {
          updatedProduct.imageFiles.forEach(file => {
            if (file) {
              formData.append("images", file);
            }
          });
        }

        const response = await axios.put(`http://localhost:5000/api/products/update/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.status === 200) {
          const saved = response.data;
          const imagesList = saved.images && saved.images.length > 0
            ? saved.images
            : ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200"];
          while (imagesList.length < 4) {
            imagesList.push("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200");
          }

          setProducts(prev => prev.map(p => p.id?.toString() === productId.toString() ? {
            ...p,
            name: saved.name,
            description: saved.description,
            price: parseFloat(saved.price) || 0.0,
            category: saved.category,
            stock: parseInt(saved.stock) || 0,
            status: parseInt(saved.stock) === 0 ? "Out of Stock" : (parseInt(saved.stock) <= 5 ? "Low Stock" : "In Stock"),
            image: imagesList[0],
            images: imagesList
          } : p));
          toast.success(`${updatedProduct.name} updated successfully!`);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating product on backend:", error);
        toast.error(error.response?.data?.message || "Failed to update product in database");
        return false;
      }
    } else {
      // Mockup local state update
      const imagesList = updatedProduct.images || ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200"];
      while (imagesList.length < 4) {
        imagesList.push("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200");
      }

      setProducts(prev => prev.map(p => p.id?.toString() === productId.toString() ? {
        ...p,
        ...updatedProduct,
        price: parseFloat(updatedProduct.price) || 0,
        stock: parseInt(updatedProduct.stock) || 0,
        status: parseInt(updatedProduct.stock) === 0 ? "Out of Stock" : (parseInt(updatedProduct.stock) <= 5 ? "Low Stock" : "In Stock"),
        image: imagesList[0],
        images: imagesList
      } : p));
      toast.success(`${updatedProduct.name} updated successfully!`);
      return true;
    }
  };

  const deleteProduct = async (id) => {
    if (isMongoId(id)) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
        if (response.status === 200) {
          setProducts(prev => prev.filter(p => p.id?.toString() !== id.toString()));
          toast.success("Product listing removed");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting product from backend:", error);
        toast.error(error.response?.data?.message || "Failed to delete product from database");
        return false;
      }
    } else {
      // Mockup local state delete
      setProducts(prev => prev.filter(p => p.id?.toString() !== id.toString()));
      toast.success("Product listing removed");
      return true;
    }
  };

  // Order Operations
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order ${orderId} updated to ${newStatus}`);

    // If order was marked shipped or delivered, add a success notification
    if (newStatus === "Shipped" || newStatus === "Delivered") {
      const newNotification = {
        id: notifications.length + 1,
        type: "order",
        title: `Order ${newStatus}`,
        desc: `Order #${orderId} was marked as ${newStatus.toLowerCase()}.`,
        date: "Just now",
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  // Review Operations
  const addReviewReply = (reviewId, text) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: text } : r));
    toast.success("Reply posted successfully!");
  };

  // Notification Operations
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All alerts marked as read");
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Withdrawal Operations
  const requestWithdrawal = (amount, bank) => {
    if (amount <= 0 || amount > stats.totalEarnings) {
      toast.error("Invalid withdrawal amount");
      return false;
    }
    const newId = `WTH-${Math.floor(922 + Math.random() * 100)}`;
    const newLog = {
      id: newId,
      date: new Date().toISOString().split("T")[0],
      bank: bank || "Chase ****4920",
      amount,
      status: "Processing"
    };
    setWithdrawals([newLog, ...withdrawals]);
    setTotalEarnings(prev => prev - amount);
    toast.success(`Withdrawal request for $${amount.toLocaleString()} logged!`);
    return true;
  };

  return (
    <DataContext.Provider value={{
      isAuthenticated,
      user,
      login,
      register,
      logout,
      updateProfile,
      products,
      orders,
      reviews,
      notifications,
      withdrawals,
      stats,
      addNewProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      addReviewReply,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      requestWithdrawal
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
