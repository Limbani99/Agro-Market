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
        // On logout: clear DB cart from memory, keep localStorage as guest cart
        setUser(null);
        setToken(null);
        setrole(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // Reset to empty (guest starts fresh; they could merge but that's advanced)
        setCartItems([]);
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
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const tok = localStorage.getItem("token") || sessionStorage.getItem("token");
                if (tok) config.headers["Authorization"] = `Bearer ${tok}`;
                return config;
            },
            (error) => Promise.reject(error)
        );
        return () => axios.interceptors.request.eject(interceptor);
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

    // Sync localStorage whenever cartItems changes (for guest / offline)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Load cart from DB when user logs in / is restored
    useEffect(() => {
        if (!authChecked) return;

        if (token && user) {
            // Fetch from DB
            axios.get(`${API}/cart`)
                .then(res => {
                    const items = (res.data?.items || []).map(mapDbItem).filter(Boolean);
                    setCartItems(items);
                })
                .catch(err => {
                    console.error("Error loading cart from DB:", err);
                    // Fall back to localStorage
                });
        }
        // If no user, cartItems stays as loaded from localStorage (guest mode)
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

        // Sync to DB if logged in
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
        // Optimistic update
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

        // Optimistic update
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