import React from 'react'
import Hero from '../component/home/Hero'
import Categories from '../component/home/Categories'
import FeaturedProducts from '../component/home/FeaturedProducts'
import TopFarmers from '../component/home/TopFarmers'
import Features from '../component/home/Features'
import Testimonials from '../component/home/Testimonials'
import Newsletter from '../component/home/Newsletter'


function Home() {
    return (
        <main>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <TopFarmers />
            <Features />
            <Testimonials />
            <Newsletter />
        </main>
    )
}

export default Home
