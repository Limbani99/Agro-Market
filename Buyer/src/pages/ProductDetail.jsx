import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../context/DataProvider'
import ProductGallery from '../component/product-detail/ProductGallery'
import ProductInfo from '../component/product-detail/ProductInfo'
import ProductTabs from '../component/product-detail/ProductTabs'
import axios from 'axios'

function ProductDetail() {
    const { id } = useParams();
    const { products } = useData();
    const [reviewsList, setReviewsList] = useState([]);

    const API = "http://localhost:5000/api";

    const product = products.find((p) => p.id?.toString() === id?.toString());

    const fetchProductReviews = async () => {
        const pid = product?.id || product?._id;
        if (pid) {
            try {
                const res = await axios.get(`${API}/reviews/product/${pid}`);
                setReviewsList(res.data);
            } catch (err) {
                console.error("Error loading product reviews:", err);
            }
        }
    };

    useEffect(() => {
        if (product) {
            fetchProductReviews();
        }
    }, [product]);

    // Calculate dynamic average rating based on actual feedback reviews list
    const averageRating = useMemo(() => {
        if (reviewsList.length === 0) return Number(product?.rating || 4.8);
        const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
        return Number((sum / reviewsList.length).toFixed(1));
    }, [reviewsList, product]);

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
                    <ProductInfo 
                        product={product} 
                        reviewsCount={reviewsList.length} 
                        averageRating={averageRating} 
                    />
                </div>
            </section>

            <ProductTabs 
                product={product} 
                reviewsList={reviewsList} 
                onReviewAdded={fetchProductReviews} 
            />
        </div>
    )
}

export default ProductDetail

