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
        const savedUser =
            localStorage.getItem("user") || sessionStorage.getItem("user");
        const savedRole = savedUser ? JSON.parse(savedUser).role : null;

        if (savedToken && savedUser) {
            const parsedUser = JSON.parse(savedUser);
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

    const value = {
        user,
        token,
        role,
        login,
        logout
    }
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