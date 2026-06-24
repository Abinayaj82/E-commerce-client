import React from 'react'
import Ratings from '../Ratings/Ratings';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProduct, removeError } from '../../features/Products/ProductSlice';
import Loader from '../Loader';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { addCartItems } from "../../features/Cart/CartSlice"
import { removeSuccess } from '../../features/Cart/CartSlice';
import { useParams } from 'react-router-dom';


const FeaturedProducts = () => {

  const { products, productCount, loading, error } = useSelector((state) => state.product);
  const { cartItems, loading: cartLoading, error: cartError, success: cartSuccess } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const { _id } = useParams();

  //console.log(products);
  //console.log(productCount);
  //console.log(loading);
  const featuredProducts = products.slice(0, 5); // Get the first 5 products as featured products

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const handleAddToCart = (product) => {
    const exists = cartItems.find(
      (item) => item.product === product._id
    );
    if (exists) {
      toast.error("Product already in cart");
      return;
    }
    const data = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image?.url,
      stock: product.stock,
      quantity: 1,
    }
    dispatch(addCartItems(data))
    console.log(data)



  }

  useEffect(() => {
    dispatch(getProduct({ keyword }));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeError())
    }
  }, [dispatch, error])
  useEffect(() => {
    if (cartError) {
      toast.error("Add to cart failed");
      dispatch(removeError())
    }
    if (cartSuccess) {
      toast.success("Added to cart ");
      dispatch(removeSuccess())
    }
  }, [dispatch, cartError, cartSuccess])

  return loading ? (
    <Loader />
  ) : (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <h2 className="text-2xl font-bold mb-6 text-center text-[#718b13]"> Featured Products</h2>
      <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5">

        {featuredProducts.map((product) => (
          <div key={product._id} className="flex flex-col rounded-lg shadow-lg hover:shadow-2xl 
                   transition duration-300 bg-white overflow-hidden">

            <NavLink to={`/product/${product._id}`}>
              <img src={product.image?.url} alt={product.name} className="w-full h-40  object-cover cursor-pointer 
                       hover:scale-105 transition duration-300"
              />
            </NavLink>

            {/* Content */}
            <div className="flex flex-col flex-1 p-3 gap-1">
              <h3 className="text-sm sm:text-base font-bold line-clamp-2">{product.name}</h3>
              <p className="text-lg font-bold text-green-600">₹{product.price} </p>

              <div className="flex items-center  ">
                <Ratings value={product.ratings} />
              </div>


              <button type="button" onClick={() => handleAddToCart(product)}
                className=" w-full mt-2 bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30 cursor-pointer">
                Add to Cart
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default FeaturedProducts

