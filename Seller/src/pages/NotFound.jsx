import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-6 text-center select-none font-body">
      <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 mb-6 animate-bounce">
        <HelpCircle className="w-10 h-10" />
      </div>
      <h1 className="font-serif text-5xl font-bold text-slate-800 tracking-tight">404</h1>
      <h2 className="font-serif text-2xl font-bold text-slate-800 mt-3">This Crop Field is Empty!</h2>
      <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
        The page you are looking for has been harvested, pruned, or never planted in our organic registry.
      </p>
      <Link
        to="/"
        className="btn-primary mt-8 inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
