import React, { useState } from 'react'
import { Calendar, Leaf, Zap, Box } from 'lucide-react'

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState('Description')
    const tabs = ['Description', 'Product Details', 'Reviews (128)']

    const attributes = [
        { icon: <Calendar className="w-5 h-5 text-orange-700" />, label: 'Harvested', value: 'Within 24 Hours' },
        { icon: <Leaf className="w-5 h-5 text-orange-700" />, label: 'Practice', value: '100% Organic' },
        { icon: <Zap className="w-5 h-5 text-orange-700" />, label: 'Nutrition', value: 'High in Vit A & K' },
        { icon: <Box className="w-5 h-5 text-orange-700" />, label: 'Storage', value: 'Crisper Drawer, 5-7 days' },
    ]

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Tab Headers */}
                <div className="flex items-center justify-center border-b border-slate-100">
                    {tabs.map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-6 text-sm font-black transition-all relative ${
                                activeTab === tab ? 'text-[#b91c1c]' : 'text-slate-400 hover:text-secondary'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#b91c1c] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black text-secondary mb-6">The King of Greens</h2>
                        <p className="text-slate-500 leading-relaxed mb-12 text-lg">
                            Our Organic Lacinato Kale is grown in the mineral-rich soils of the valley, giving it a deeper color 
                            and a more robust flavor profile than standard curly varieties. The leaves are tender yet hold up 
                            beautifully to cooking, making it an incredibly versatile ingredient for professional kitchens 
                            and home cooks alike.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {attributes.map((attr, i) => (
                                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center group hover:shadow-xl hover:shadow-orange-900/5 transition-all">
                                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                        {attr.icon}
                                    </div>
                                    <span className="text-secondary font-black text-sm mb-1">{attr.label}</span>
                                    <span className="text-slate-400 font-bold text-xs">{attr.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductTabs
