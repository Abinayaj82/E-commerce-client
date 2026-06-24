import React from 'react'
import PageTitle from '../../Components/PageTitle'
import Footer from '../../Components/Footer/Footer'
import Ratings from '../../Components/Ratings/Ratings'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { PackageCheck, PackageX, ShoppingCart } from 'lucide-react'
import { getProductDetail, productReview, removeError } from '../../features/Products/ProductSlice';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addCartItems } from "../../features/Cart/CartSlice"
import { removeSuccess } from '../../features/Cart/CartSlice';
import { useState } from 'react';

const ProductDetail = () => {
  const { product, loading, error } = useSelector((state) => state.product);
  const { cartItems, loading: cartLoading, error: cartError, success: cartSuccess } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [ratings, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // console.log(product);
  const { _id } = useParams();

  const handleAddToCart = () => {
    const data = {
      product: product.product._id,
      name: product.product.name,
      price: product.product.price,
      image: product.product.image?.url,
      stock: product.product.stock,
      quantity,
    }
    dispatch(addCartItems(data))
    // console.log(data)



  }
  const handleIncrease = (item) => {
    if (quantity >= product.product.stock) return;

    setQuantity(quantity + 1);
  }
  const handleDecrease = (item) => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);

  }
  const handleProductReview = () => {

    const reviewData = {
      ratings,
      comment,
      productId: _id,
    }
    dispatch(productReview(reviewData));
    console.log(reviewData)
  }
  useEffect(() => {
    if (_id) {
      dispatch(getProductDetail(_id));
    } if (error) {
      toast.error(error.message);
    }
  }, [dispatch, _id])
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

  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
    }
  }, [location]);

  const discountPercentage = () => {
    return product?.product?.originalPrice && product?.product?.price ? Math.ceil(((product.product.originalPrice - product.product.price) / product.product.originalPrice) * 100) : 0;
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="bg-[#DBE4C9] min-h-screen">
      <div className="px-2 sm:px-5 py-4">
        <PageTitle title={` ${product?.product?.name}`} />
        <main className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg ">
          {/* Product Detail Content */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
            {/* Product Image */}
            <div>
              <img src={product?.product?.image?.url} alt={product?.product?.name} className="w-full h-40 sm:h-66 md:h-96 object-cover rounded-lg" />
            </div>
            {/* Product Information */}
            <div>
              <h2 className="text-3xl font-bold mb-4">{product?.product?.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl text-green-600 font-semibold">₹{product?.product?.price}</span>
                <span className="text-lg text-gray-500 line-through mr-2">₹{product?.product?.originalPrice}</span>
                <span className="text-sm text-red-500 font-semibold">{discountPercentage()}% OFF</span>
              </div>
              <p className="text-gray-700 mb-6">Our fresh organic apples are handpicked from local farms, ensuring the highest quality and taste. Packed with nutrients and bursting with flavor, these apples are perfect for snacking, baking, or making delicious apple cider.</p>

              {product?.product?.stock > 0 ? (<div className="flex items-center gap-1 mb-6">
                <PackageCheck size={16} className="text-green-600" />
                <span className="text-sm font-normal text-green-700">In Stock ({product?.product?.stock} Available)</span>
              </div>) : (<div className="flex items-center gap-1 mb-6">
                <PackageX size={16} className="text-red-600" />
                <span className="text-sm font-normal text-red-700">Out of Stock</span>
              </div>)}


              {/* Quantity Selector and Add to Cart Button */}
              {product?.product?.stock > 0 && (
                <div className="flex items-center flex-row gap-6 mb-6">
                  <div className="flex items-center ">
                    <button onClick={() => handleDecrease(product?.product?.quantity)} className="bg-[#d1d4c3] text-black px-3 py-1 sm:px-5 sm:py-2 rounded hover:bg-[#718b13] transition duration-300 cursor-pointer">
                      -</button>
                    <span className="mx-4 text-lg font-semibold"> {quantity}</span>
                    <button onClick={() => handleIncrease(product?.product?.quantity)} className="bg-[#d1d4c3] text-black px-3 py-1 sm:px-5 sm:py-2 rounded hover:bg-[#718b13] transition duration-300 cursor-pointer">
                      +
                    </button>
                  </div>
                  <button onClick={handleAddToCart} className="bg-[#97b03a] flex items-center text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-[#718b13] transition duration-300 cursor-pointer">
                    <ShoppingCart size={16} className="text-white mr-3" />Add to Cart
                  </button>
                </div>
              )}
              {/* Review Form */}
              <form onSubmit={handleProductReview} className="mb-5 border-t border-gray-300 p-5">
                <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                <div className="flex items-center gap-3 mb-6">
                  <Ratings value={ratings} onRatingChange={(newRating) => setRating(newRating)}
                  />
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-gray-300 rounded-lg p-4 mb-4" rows="4" placeholder="Write your review here..."></textarea>
                <button type="submit" className="bg-[#97b03a]  text-white px-4 py-2 rounded  hover:bg-[#718b13] transition duration-300 cursor-pointer">
                  Submit Review
                </button>
              </form>


            </div>

          </div>
        </main>
        {/* Reviews Section */}
        {product?.product?.reviews.length > 0 ? (
          <div className="flex flex-col max-w-7xl mx-auto px-4 py-8">
            <h3 className="text-xl font-bold mb-4 border-l-4 border-amber-500 pl-4"> Customer Reviews</h3>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">

              {product?.product?.reviews.map((review, index) => (
                <div key={index} className="mb-4 bg-amber-50 outline  outline-[#97b03a] p-4 rounded-sm shadow">
                  <div className="flex flex-col gap-0  sm:flex-row sm:items-center sm:justify-between  sm:gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full mr-2" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                          <span className="text-gray-600 font-bold">{review.name.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <span className="text-sm font-bold text-gray-950">{review.name.charAt(0).toUpperCase() + review.name.slice(1)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500"> {formatDate(review.createdAt)}</span>
                    </div>
                  </div>


                  {/*ratings */}
                  <div>
                    <Ratings value={review.ratings} />
                  </div>
                  <div>
                    <p>
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}



            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-10">
            <PackageX size={48} className="text-red-600" />
            <h3 className="text-xl font-bold text-gray-700">No Reviews Yet</h3>
            <p className="text-gray-500">Be the first to review this product!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail
