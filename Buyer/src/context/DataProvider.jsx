import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import React from "react";

export const DataContext = createContext();

const API = "http://localhost:5000/api";

// Helper: map a raw DB cart item to our UI shape
const mapDbItem = (dbItem) => {
    const p = dbItem.product;
    if (!p) return null;
    return {
        id: p._id,
        cartItemId: dbItem._id,
        name: p.name,
        seller: p.sellerId?.farmName || p.sellerId?.name || 'Agro Market Seller',
        price: Number(p.price),
        quantity: dbItem.quantity,
        image: p.images?.[0] || 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=400',
        badge: p.stock > 10 ? 'PEAK SEASON' : 'ORGANIC',
        badgeColor: p.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700',
        category: p.category || 'Produce',
        stock: p.stock
    };
};

// Helper: map a local product object to UI shape (no DB item)
const mapLocalItem = (product, qty) => ({
    id: product.id || product._id,
    name: product.name,
    seller: product.seller || product.sellerId?.farmName || 'Agro Market Seller',
    price: Number(product.price),
    quantity: qty,
    image: product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=400',
    badge: product.badge || 'ORGANIC',
    badgeColor: product.badgeColor || 'bg-green-100 text-green-700',
    category: product.category || 'Produce',
    stock: product.stock
});

// Helper: map a raw DB order item to our UI shape
const mapDbOrder = (dbOrder) => {
    return {
        id: dbOrder._id,
        status: dbOrder.status,
        statusColor: dbOrder.status === 'Pending' ? 'bg-slate-100 text-slate-700' :
                     dbOrder.status === 'Shipped' ? 'bg-yellow-100 text-yellow-700' :
                     dbOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                     'bg-red-100 text-red-700',
        date: new Date(dbOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        total: `$${Number(dbOrder.totalPrice).toFixed(2)}`,
        rawTotal: Number(dbOrder.totalPrice),
        shippingAddress: dbOrder.shippingAddress,
        phone: dbOrder.phone,
        paymentMethod: dbOrder.paymentMethod,
        products: (dbOrder.products || []).map(p => {
            const prod = p.product;
            if (!prod) return null;
            return {
                id: prod._id,
                name: prod.name,
                price: Number(prod.price),
                quantity: p.quantity,
                image: prod.images?.[0] || 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=400',
                seller: prod.sellerId?.farmName || prod.sellerId?.name || 'Agro Market Seller'
            };
        }).filter(Boolean)
    };
};

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setrole] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    // ─────────────────── Auth ───────────────────
    const login = (userData, tok) => {
        if (userData) {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        }
        if (tok) {
            setToken(tok);
            localStorage.setItem("token", tok);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setrole(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setCartItems([]);
        setOrders([]);
        localStorage.removeItem("cart");
    };

    // Restore session on mount
    useEffect(() => {
        const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
        const savedUserStr = localStorage.getItem("user") || sessionStorage.getItem("user");

        let parsedUser = null;
        let savedRole = null;
        try {
            if (savedUserStr && savedUserStr !== "undefined" && savedUserStr !== "null") {
                parsedUser = JSON.parse(savedUserStr);
                savedRole = parsedUser?.role || null;
            }
        } catch (e) {
            console.error("Error parsing saved user", e);
        }

        if (savedToken && parsedUser) {
            setUser(parsedUser);
            setToken(savedToken);
            setrole(savedRole);
        }
        setAuthChecked(true);
    }, []);

    // Axios auth interceptor
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const tok = localStorage.getItem("token") || sessionStorage.getItem("token");
                if (tok) config.headers["Authorization"] = `Bearer ${tok}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                    setToken(null);
                    setrole(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setCartItems([]);
                    setOrders([]);
                    localStorage.removeItem("cart");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    // ─────────────────── Products ───────────────────
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get(`${API}/products`);
            const mapped = res.data.map(p => ({
                ...p,
                id: p._id,
                seller: p.sellerId?.farmName || p.sellerId?.name || 'Riverbend Farm',
                rating: p.rating || 4.8,
                unit: p.unit || 'lb',
                image: p.images?.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=800',
                badge: p.stock > 10 ? 'PEAK SEASON' : 'ORGANIC'
            }));
            setProducts(mapped);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }, []);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    // ─────────────────── Cart State ───────────────────
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    // Sync localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Load cart from DB when user logs in / is restored
    useEffect(() => {
        if (!authChecked) return;

        if (token && user) {
            axios.get(`${API}/cart`)
                .then(res => {
                    const items = (res.data?.items || []).map(mapDbItem).filter(Boolean);
                    setCartItems(items);
                })
                .catch(err => {
                    console.error("Error loading cart from DB:", err);
                });
        }
    }, [token, user, authChecked]);

    // ─────────────────── Toast ───────────────────
    const [toastItem, setToastItem] = useState(null);
    const toastTimer = React.useRef(null);

    const showToast = (product) => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToastItem(product);
        toastTimer.current = setTimeout(() => setToastItem(null), 2500);
    };

    const dismissToast = () => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToastItem(null);
    };

    // ─────────────────── Cart Actions ───────────────────
    const addToCart = async (product, qty = 1) => {
        const productId = product.id || product._id;

        // Optimistic UI update first
        setCartItems(prev => {
            const existing = prev.find(i => i.id === productId);
            if (existing) {
                return prev.map(i => i.id === productId ? { ...i, quantity: i.quantity + qty } : i);
            }
            return [...prev, mapLocalItem(product, qty)];
        });
        showToast(product);

        if (token && user) {
            try {
                const res = await axios.post(`${API}/cart/add`, { productId, quantity: qty });
                const items = (res.data?.items || []).map(mapDbItem).filter(Boolean);
                setCartItems(items);
            } catch (err) {
                console.error("Error syncing addToCart to DB:", err);
            }
        }
    };

    const removeFromCart = async (productId) => {
        setCartItems(prev => prev.filter(i => i.id !== productId));

        if (token && user) {
            try {
                const res = await axios.delete(`${API}/cart/remove/${productId}`);
                const items = (res.data?.items || []).map(mapDbItem).filter(Boolean);
                setCartItems(items);
            } catch (err) {
                console.error("Error syncing removeFromCart to DB:", err);
            }
        }
    };

    const updateCartQuantity = async (productId, qty) => {
        const safeQty = Math.max(1, qty);
        setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity: safeQty } : i));

        if (token && user) {
            try {
                const res = await axios.put(`${API}/cart/update`, { productId, quantity: safeQty });
                const items = (res.data?.items || []).map(mapDbItem).filter(Boolean);
                setCartItems(items);
            } catch (err) {
                console.error("Error syncing updateCartQuantity to DB:", err);
            }
        }
    };

    const clearCart = async () => {
        setCartItems([]);
        localStorage.removeItem("cart");

        if (token && user) {
            try {
                await axios.delete(`${API}/cart/clear`);
            } catch (err) {
                console.error("Error clearing cart in DB:", err);
            }
        }
    };

    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // ─────────────────── Orders State ───────────────────
    const [orders, setOrders] = useState([]);

    const fetchOrders = useCallback(async () => {
        if (token && user) {
            try {
                const res = await axios.get(`${API}/order`);
                const mapped = (res.data || []).map(mapDbOrder);
                setOrders(mapped);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        }
    }, [token, user]);

    useEffect(() => {
        if (token && user) {
            fetchOrders();
        } else {
            setOrders([]);
        }
    }, [token, user, fetchOrders]);

    // ─────────────────── Notifications State ───────────────────
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = useCallback(async () => {
        if (token && user) {
            try {
                const res = await axios.get(`${API}/notifications`);
                const mapped = res.data.map(n => ({
                    id: n._id,
                    type: n.type || 'general',
                    title: n.title || 'Marketplace Alert',
                    desc: n.message || '',
                    read: n.isRead,
                    date: new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }));
                setNotifications(mapped);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            }
        }
    }, [token, user]);

    const markNotificationRead = async (id) => {
        try {
            await axios.put(`${API}/notifications/read/${id}`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error("Error marking notification read:", err);
        }
    };

    const markAllNotificationsRead = async () => {
        try {
            await axios.put(`${API}/notifications/read-all`);
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error("Error marking all notifications read:", err);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await axios.delete(`${API}/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };

    useEffect(() => {
        if (!authChecked) return;

        if (token && user) {
            fetchNotifications();
        } else {
            setNotifications([]);
        }
    }, [token, user, authChecked, fetchNotifications]);

    // ─────────────────── Wishlist State ───────────────────
    const [wishlistItems, setWishlistItems] = useState([]);

    const fetchWishlist = useCallback(async () => {
        if (token && user) {
            try {
                const res = await axios.get(`${API}/wishlist`);
                const mapped = res.data.map(item => {
                    const p = item.product;
                    if (!p) return null;
                    return {
                        id: p._id,
                        wishlistItemId: item._id,
                        name: p.name,
                        price: Number(p.price),
                        image: p.images?.[0] || 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=400',
                        seller: p.sellerId?.farmName || p.sellerId?.name || 'Agro Market Seller',
                        rating: p.rating || 4.8,
                        unit: p.unit || 'lb',
                        badge: p.stock > 10 ? 'PEAK SEASON' : 'ORGANIC',
                        stock: p.stock
                    };
                }).filter(Boolean);
                setWishlistItems(mapped);
            } catch (err) {
                console.error("Error fetching wishlist:", err);
            }
        }
    }, [token, user]);

    const toggleWishlist = async (product) => {
        if (!token || !user) {
            alert("Please log in to manage your wishlist");
            return;
        }
        const productId = product.id || product._id;
        const isWish = wishlistItems.some(item => item.id === productId);

        if (isWish) {
            try {
                await axios.delete(`${API}/wishlist/remove/${productId}`);
                setWishlistItems(prev => prev.filter(item => item.id !== productId));
            } catch (err) {
                console.error("Error removing from wishlist:", err);
            }
        } else {
            try {
                const res = await axios.post(`${API}/wishlist/add`, { productId });
                const p = res.data.product;
                if (p) {
                    const newItem = {
                        id: p._id,
                        wishlistItemId: res.data._id,
                        name: p.name,
                        price: Number(p.price),
                        image: p.images?.[0] || 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=400',
                        seller: p.sellerId?.farmName || p.sellerId?.name || 'Agro Market Seller',
                        rating: p.rating || 4.8,
                        unit: p.unit || 'lb',
                        badge: p.stock > 10 ? 'PEAK SEASON' : 'ORGANIC',
                        stock: p.stock
                    };
                    setWishlistItems(prev => [newItem, ...prev]);
                }
            } catch (err) {
                console.error("Error adding to wishlist:", err);
            }
        }
    };

    const isWishlisted = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    useEffect(() => {
        if (!authChecked) return;

        if (token && user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
        }
    }, [token, user, authChecked, fetchWishlist]);

    // ─────────────────── Favorite Farmers State ───────────────────
    const [favoriteFarmers, setFavoriteFarmers] = useState(() => {
        try {
            const saved = localStorage.getItem("favoriteFarmers");
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem("favoriteFarmers", JSON.stringify(favoriteFarmers));
    }, [favoriteFarmers]);

    const toggleFavoriteFarmer = (farmer) => {
        const farmerId = farmer.id || farmer._id;
        setFavoriteFarmers(prev => {
            const exists = prev.some(f => f.id === farmerId);
            if (exists) {
                return prev.filter(f => f.id !== farmerId);
            } else {
                return [...prev, {
                    id: farmerId,
                    name: farmer.name,
                    farmName: farmer.farmName || 'Agro Market',
                    avatar: farmer.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${farmer.name}`
                }];
            }
        });
    };

    const isFavoriteFarmer = (farmerId) => {
        return favoriteFarmers.some(f => f.id === farmerId);
    };

    const placeOrder = async (orderDetails) => {
        if (!token || !user) {
            throw new Error("Please log in to place an order");
        }

        try {
            const backendProducts = cartItems.map(item => ({
                product: item.id,
                quantity: item.quantity
            }));

            const res = await axios.post(`${API}/order/add`, {
                products: backendProducts,
                totalPrice: orderDetails.totalPrice,
                shippingAddress: orderDetails.shippingAddress,
                phone: orderDetails.phone,
                paymentMethod: orderDetails.paymentMethod || 'Cash on Delivery'
            });

            const newOrder = mapDbOrder(res.data);
            setOrders(prev => [newOrder, ...prev]);
            
            // Clear in-memory cart
            setCartItems([]);
            localStorage.removeItem("cart");
            
            // Re-fetch products to update stock counts
            fetchProducts();

            return newOrder;
        } catch (err) {
            console.error("Error placing order:", err);
            throw new Error(err.response?.data?.message || "Failed to place order");
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const formData = new FormData();
            formData.append("name", profileData.name);
            formData.append("email", profileData.email);
            formData.append("phone", profileData.phone);
            formData.append("address", profileData.address);

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
        } catch (err) {
            console.error("Error updating profile:", err);
            alert(err.response?.data?.message || "Failed to update profile");
            return false;
        }
    };

    // ─────────────────── Context Value ───────────────────
    const value = {
        user, token, role,
        login, logout,
        authChecked,
        isAuthenticated: !!token,
        products, fetchProducts,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        orders,
        fetchOrders,
        placeOrder,
        updateProfile,
        notifications,
        fetchNotifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        wishlistItems,
        fetchWishlist,
        toggleWishlist,
        isWishlisted,
        favoriteFarmers,
        toggleFavoriteFarmer,
        isFavoriteFarmer,
        toastItem,
        dismissToast
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);