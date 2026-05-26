import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../context/DataProvider'
import ProductGallery from '../component/product-detail/ProductGallery'
import ProductInfo from '../component/product-detail/ProductInfo'
import ProductTabs from '../component/product-detail/ProductTabs'

function ProductDetail() {
    const { id } = useParams();
    const { products } = useData();

    const product = products.find((p) => p.id?.toString() === id?.toString());

    if (!product) {
        return (
            <div className="text-center py-20 bg-white min-h-screen">
                <p className="text-slate-400 font-bold text-lg">Harvest listing not found...</p>
                <Link to="/products" className="text-primary font-bold hover:underline mt-4 inline-block">Return to Crops Catalog</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Breadcrumb */}
            <div className="container mx-auto px-4 py-6">
                <nav className="text-sm text-slate-500">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">›</span>
                    <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                    <span className="mx-2">›</span>
                    <span className="font-bold text-secondary">{product.name}</span>
                </nav>
            </div>

            {/* 2. Main Product Section */}
            <section className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>
            </section>

            <ProductTabs product={product} />
        </div>
    )
}

export default ProductDetail

