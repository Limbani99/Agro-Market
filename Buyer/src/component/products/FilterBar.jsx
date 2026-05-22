import React from 'react'
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-react'

const FilterBar = () => {
    return (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Results Count */}
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-slate-500">
                            Showing <span className="text-secondary font-bold">124</span> products
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
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort by:</span>
                            <button className="flex items-center gap-2 text-sm font-bold text-secondary group">
                                Most Popular
                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                            </button>
                        </div>

                        <div className="h-8 w-px bg-slate-100" />

                        {/* View Toggles */}
                        <div className="flex items-center bg-slate-50 p-1 rounded-xl">
                            <button className="p-2 bg-white text-primary shadow-sm rounded-lg transition-all">
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-secondary transition-all">
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
