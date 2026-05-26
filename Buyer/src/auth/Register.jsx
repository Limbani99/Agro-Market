import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'buyer',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        console.log("Form Submitted (Front-End Only):", formData);
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
            const res = await axios.post(`${API_URL}/users/register`, formData);
            console.log("Response:", res.data);
            toast.success("User registered successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Error registering user");
            console.log("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-light p-4 font-body">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

                {/* Left Side - Hero / Info */}
                <div className="md:w-5/12 bg-secondary p-8 flex flex-col justify-between hidden md:flex relative overflow-hidden">
                    {/* Overlay Image */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfefcb19?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

                    <div className="relative z-10 pt-8">
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight font-display">Join Agro Market</h2>
                        <p className="text-slate-200 text-lg leading-relaxed">
                            Connect directly with local farmers and buyers in your area. Access fresh agricultural produce, fast delivery, and real-time tracking.
                        </p>
                    </div>

                    <div className="relative z-10 pb-8">
                        <p className="text-sm text-slate-300 mb-3">Already have an account?</p>
                        <Link to="/login" className="btn-outline inline-block text-center w-auto">
                            Sign In
                        </Link>
                    </div>

                    {/* Decorative shapes */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent rounded-full blur-3xl opacity-30"></div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold text-secondary tracking-wide font-display">Create an Account</h3>
                        <p className="text-slate-500 mt-2 text-sm">Please fill in your details to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 9876543210"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Role */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Account Type</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
                                >
                                    <option value="buyer">Buyer</option>
                                    <option value="farmer">Farmer</option>
                                </select>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Farm Lane, Village/City"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-primary w-full mt-6"
                        >
                            Create Account
                        </button>

                        {/* Mobile Sign In Link */}
                        <p className="text-center text-sm text-slate-500 mt-6 md:hidden">
                            Already have an account? <Link to="/login" className="text-primary hover:text-primary-dark font-medium ml-1">Sign In</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;
