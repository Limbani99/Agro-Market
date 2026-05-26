import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataProvider";
import { Mail, Lock, Sprout, ArrowRight } from "lucide-react";
import axios from "axios";

export default function Login() {
  const { login } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      if (res.data.success) {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-6 select-none relative overflow-hidden font-body">
      {/* Decorative organic background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E9E6DC] p-8 shadow-xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100/50 mx-auto mb-4 hover:scale-105 transition-transform duration-300">
            <Sprout className="w-8 h-8 stroke-[2.2px]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-800">Terra Agro Seller Portal</h2>
          <p className="text-slate-500 text-xs mt-1.5 font-medium">Log in to manage your organic farm harvest</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[12.5px] font-bold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="james.miller@greenvalley.com"
                className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-bg-light/35 font-medium placeholder-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12.5px] font-bold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-bg-light/35 font-medium placeholder-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right mt-1.5">
              <Link to="#" className="text-[11px] font-bold text-slate-400 hover:text-primary transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#3F704D] hover:bg-primary-dark text-white rounded-full font-bold shadow-sm transition-all duration-200 mt-2 active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <span>Access Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-[#F0EDE6] text-xs font-semibold text-slate-500">
          New harvest manager?{" "}
          <Link to="/register" className="text-primary hover:text-primary-dark hover:underline font-bold">
            Create Farm Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
