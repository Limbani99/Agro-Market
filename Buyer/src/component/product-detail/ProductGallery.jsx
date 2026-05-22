import React, { useState } from 'react'
import { Sun } from 'lucide-react'

const ProductGallery = () => {
    const images = [
        '/assets/kale_main.png',
        '/assets/kale_thumb1.png',
        '/assets/kale_thumb2.png',
        '/assets/kale_thumb3.png'
    ]
    const [activeImg, setActiveImg] = useState(0)

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100 group">
                <div className="absolute top-6 left-6 z-10">
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-xs font-bold shadow-lg">
                        <Sun className="w-4 h-4" />
                        Peak Season
                    </div>
                </div>
                <img 
                    src={images[activeImg]} 
                    alt="Product" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=800' }}
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((img, i) => (
                    <button 
                        key={i}
                        onClick={() => setActiveImg(i + 1)}
                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                            activeImg === i + 1 ? 'border-primary shadow-md' : 'border-transparent hover:border-slate-200'
                        }`}
                    >
                        <img 
                            src={img} 
                            alt={`Thumbnail ${i + 1}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=200' }}
                        />
                    </button>
                ))}
                {/* Fallback for the first image thumb */}
                <button 
                    onClick={() => setActiveImg(0)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImg === 0 ? 'border-primary shadow-md' : 'border-transparent hover:border-slate-200'
                    }`}
                >
                    <img 
                        src={images[0]} 
                        alt="Main Thumbnail" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=200' }}
                    />
                </button>
            </div>
        </div>
    )
}

export default ProductGallery
