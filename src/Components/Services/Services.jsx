import React from 'react'
import { Truck ,Leaf, Headphones,CreditCard,Tag} from 'lucide-react'

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#718b13]">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Truck size={48} className="mx-auto mb-4 text-green-600"/>
                <h3 className="text-lg font-bold mb-2">Free Delivery</h3>
                <p className="text-gray-600">Get your groceries delivered to your doorstep for free on orders above ₹500.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Leaf size={48} className="mx-auto mb-4 text-green-600"/>
                <h3 className="text-lg font-bold mb-2">Fresh Quality</h3>
                <p className="text-gray-600">We source our products from trusted farmers and suppliers to ensure freshness and quality.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Headphones size={48} className="mx-auto mb-4 text-green-600"/>
                <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our customer support team is available around the clock to assist you with any queries or issues.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <CreditCard size={48} className="mx-auto mb-4 text-green-600"/>
                <h3 className="text-lg font-bold mb-2">Secure Payment</h3>
                <p className="text-gray-600">We offer secure payment options to ensure your transactions are safe and protected.</p>

            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Tag size={48} className="mx-auto mb-4 text-green-600"/>
                <h3 className="text-lg font-bold mb-2">Best Prices</h3>
                <p className="text-gray-600">We offer competitive prices on all our products, ensuring you get the best value for your money.</p>
            </div>

                

        </div>
    </div>
  )
}

export default Services
