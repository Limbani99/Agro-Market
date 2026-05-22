import React from 'react'
import { Link } from 'react-router-dom'
import ProductGallery from '../component/product-detail/ProductGallery'
import ProductInfo from '../component/product-detail/ProductInfo'
import ProductTabs from '../component/product-detail/ProductTabs'

function ProductDetail() {
    return (
        <div className="bg-white min-h-screen">
            {/* 1. Breadcrumb */}
            <div className="container mx-auto px-4 py-6">
                <nav className="text-sm text-slate-500">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">›</span>
                    <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                    <span className="mx-2">›</span>
                    <span className="font-bold text-secondary">Organic Lacinato Kale</span>
                </nav>
            </div>

            {/* 2. Main Product Section */}
            <section className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ProductGallery />
                    <ProductInfo />
                </div>
            </section>

            <ProductTabs />
        </div>
    )
}

export default ProductDetail

