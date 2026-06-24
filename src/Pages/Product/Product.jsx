import React from 'react'
import PageTitle from '../../Components/PageTitle'
import Footer from '../../Components/Footer/Footer.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProduct, removeError } from '../../features/Products/ProductSlice';
import Loader from '../../Components/Loader';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import Ratings from '../../Components/Ratings/Ratings';
import Pagination from '../../Components/Pagination.jsx';
import { useSearchParams } from 'react-router-dom';
import { CassetteTape } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { addCartItems } from "../../features/Cart/CartSlice"
import { removeSuccess } from '../../features/Cart/CartSlice';
import { useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Product = () => {
  const { products, productCount, loading, error, resultsPerPage, totalPages } = useSelector((state) => state.product);
  const [categoryOpen, setCategoryOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const pageFromURL = parseInt(searchParams.get('page'), 10) || 1;
  const category = searchParams.get('category') || '';
  const [currentPage, setCurrentPage] = useState(pageFromURL)
  const { cartItems, loading: cartLoading, error: cartError, success: cartSuccess } = useSelector((state) => state.cart)

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      const newSearchParams = new URLSearchParams(location.search);
      if (pageNumber === 1) {
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', pageNumber);
      }
      navigate(`?${newSearchParams.toString()}`)

      // console.log(pageNumber);

    }
  };
  const handleAddToCart = (product) => {
    const exists = cartItems.find(
      (item) => item.product === product._id
    );
    if (exists) {
      toast.error("Product already in cart");
      return;
    }
    const data = {
      product: product?._id,
      name: product.name,
      price: product.price,
      image: product.image?.url,
      stock: product.stock,
      quantity: 1,
    }
    dispatch(addCartItems(data))
    console.log(data)
  }

  const handleCategory = (category) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.delete('page');
    if (category === "All") {
      newSearchParams.delete('category');
      newSearchParams.delete('keyword');
    } else {
      newSearchParams.set('category', category);
      newSearchParams.delete('keyword');
    }
    navigate(`?${newSearchParams.toString()}`)

  }




  //console.log(products);
  //console.log(productCount);
  //console.log(loading);


  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeError())
    }
  }, [dispatch, error])
  useEffect(() => {
    if (cartError) {
      toast.error("Failed to delete");
      dispatch(removeError())
    }
    if (cartSuccess) {
      toast.success("Added to cart ");
      dispatch(removeSuccess())
    }
  }, [dispatch, cartError, cartSuccess])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.category-dropdown') && !event.target.closest('.category-dropdown')) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-[#DBE4C9] min-h-screen">
      <PageTitle title="Products | E-Commerce" />
      <main className=" flex flex-col md:flex-row   gap-8 mx-auto px-4 py-8">
        {/* Sidebar for Categories */}
        <aside className='w-full sticky top-16  md:w-1/4   bg-amber-50 rounded-lg pt-2 pl-5 pr-2 md:p-6 shadow-lg  h-max '>
          <div className="flex items-center justify-between  mb-1  md:mb-2 border-0 md:border-b border-[#718b13]">
            <h2 className="text-lg font-medium  text-[#718b13]">Categories</h2>
            <ChevronDown onClick={() => setCategoryOpen(!categoryOpen)} className={` category-dropdown text-[#718b13] md:hidden cursor-pointer  ${categoryOpen ? "rotate-180" : "rotate-0"}`} />
          </div>
          <ul className={`space-y-4 md:block  overflow-hidden  ${categoryOpen ? "max-h-96" : "max-h-0 md:max-h-96"}`}>
            {["All", "Fruits", "Vegetables", "Groceries", "Dairy", "Bakery", "Beverages"].map((category) => (
              <li key={category} className="text-gray-700 hover:text-[#97b03a]  cursor-pointer">
                <button className="bg-transparent border-none cursor-pointer text-gray-700 hover:text-[#97b03a]" onClick={() => handleCategory(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <section className="w-full md:w-3/4  flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className=" text-md md:text-2xl font-bold  text-center text-[#718b13]">Our Fresh Products</h2>
            <span>{products.length} Items found</span>
          </div>
          <div className="w-full">
            {/* Product Card */}
            {loading ? (
              <Loader />
            ) : (

              <div className=" rounded-lg  mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {/* Product Card */}
                {products.map((product, index) => (
                  <div key={index} className="  mb-4 gap-6 p-3">

                    <div className="  mb-4 gap-6   border-none rounded-lg shadow-lg hover:shadow-2xl transition duration-300 bg-white">

                      <NavLink key={product._id} to={`/product/${product._id}`}>
                        <div className="overflow-hidden rounded-lg group">
                          <img src={product.image?.url} alt={product.name} className="w-full h-30 object-cover rounded-t-lg mb-2 cursor-pointer  transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1 " loading='lazy' />
                        </div>
                      </NavLink>
                     
                      <h3 className="text-lg font-bold p-2">{product.name}</h3>
                      <p className="text-xl font-bold ml-2 text-green-600">₹{product.price}</p>
                      <div className='flex items-center ml-2 mb-2 cursor-pointer'>
                        <Ratings value={product.ratings} />
                      </div>

                    <div className=" p-2" >
                      <button type="button" onClick={() => handleAddToCart(product)} className="w-full  mb-2 bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-2 px-2 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30  cursor-pointer" >
                        Add to Cart
                      </button>
                      </div>

                    </div>

                  </div>

                ))}
                {/* no Product found */}
                {products.length === 0 && (
                  <p className="text-center  text-gray-500">No products found.</p>
                )}


              </div>



            )}
          </div>

        </section>


      </main>
      <div className="flex items-center justify-center my-8">
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <Footer />
    </div>
  )
}

export default Product
