import React, { useState, useRef, useEffect } from 'react'
import { LayoutGrid, List, SlidersHorizontal, ChevronDown, Check } from 'lucide-react'

const FilterBar = ({ totalCount, sortOption, setSortOption, viewMode, setViewMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        "Most Popular",
        "Price: Low to High",
        "Price: High to Low",
        "Customer Ratings"
    ];

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Results Count */}
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-slate-500">
                            Showing <span className="text-secondary font-bold">{totalCount}</span> products
                        </p>
                        <div className="h-4 w-px bg-slate-200 hidden md:block" />
                        <button className="flex lg:hidden items-center gap-2 text-sm font-bold text-secondary px-3 py-1.5 bg-slate-100 rounded-lg">
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 text-sm font-bold text-secondary group cursor-pointer"
                            >
                                {sortOption}
                                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-primary transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                            </button>

                            {/* Dropdown Options Box */}
                            {isOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                    {options.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setSortOption(opt);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                                sortOption === opt 
                                                    ? 'bg-primary text-white shadow-xs' 
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                                            }`}
                                        >
                                            {opt}
                                            {sortOption === opt && <Check className="w-3.5 h-3.5 text-white" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="h-8 w-px bg-slate-100" />

                        {/* View Toggles */}
                        <div className="flex items-center bg-slate-50 p-1 rounded-xl">
                            <button 
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-all cursor-pointer ${
                                    viewMode === "grid" 
                                        ? "bg-white text-primary shadow-sm" 
                                        : "text-slate-400 hover:text-secondary"
                                }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-all cursor-pointer ${
                                    viewMode === "list" 
                                        ? "bg-white text-primary shadow-sm" 
                                        : "text-slate-400 hover:text-secondary"
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
