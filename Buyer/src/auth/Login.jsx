import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useData } from '../context/DataProvider';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useData();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Form Submitted (Front-End Only):", formData);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const { data } = await axios.post(`${API_URL}/users/login`, formData);
      console.log("Response:", data);
      login(data.user, data.token)
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging in user");
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light p-4 font-body">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

        {/* Left Side - Form */}
        <div className="w-full md:w-6/12 p-8 md:p-14 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h3 className="text-4xl font-bold text-secondary tracking-wide font-display">Welcome Back</h3>
            <p className="text-slate-500 mt-3 text-base">Sign in to your Agro Market account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:text-primary-dark transition-colors font-medium">Forgot Password?</Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full mt-8"
            >
              Sign In
            </button>

            {/* Mobile Sign Up Link */}
            <p className="text-center text-sm text-slate-500 mt-8 md:hidden">
              Don't have an account? <Link to="/register" className="text-primary hover:text-primary-dark font-medium ml-1">Sign Up</Link>
            </p>
          </form>
        </div>

        {/* Right Side - Hero / Info */}
        <div className="md:w-6/12 bg-secondary p-12 flex flex-col justify-center items-center hidden md:flex relative overflow-hidden text-center">
          {/* Overlay Image */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1595841696650-6f4dd8bd2608?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight font-display">Harvest the Best,<br />Directly from Farms.</h2>
            <p className="text-slate-200 text-lg leading-relaxed mb-8">
              Log in to manage your orders, track deliveries, and discover fresh agricultural products.
            </p>
          </div>

          <div className="relative z-10 w-full pt-8 border-t border-white/20 mt-4">
            <p className="text-sm text-slate-300 mb-4">Don't have an account yet?</p>
            <Link to="/register" className="btn-outline inline-block text-center w-auto">
              Create an Account
            </Link>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent rounded-full blur-[80px] opacity-20"></div>
        </div>

      </div>
    </div>
  );
};

export default Login;
