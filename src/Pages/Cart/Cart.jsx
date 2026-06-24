import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems,removeCartItems,removeError,removeSuccess, updateQuantity } from '../../features/Cart/CartSlice'
import { useEffect} from 'react'
import toast from 'react-hot-toast'
import CheckOutSteps from '../../Components/CheckOutSteps'
import PageTitle from '../../Components/PageTitle'


const Cart = () => {
    const { cartItems , loading, error,success} = useSelector((state)=>state.cart)
    //console.log(cartItems)
    const dispatch = useDispatch();
    const itemsPrice = cartItems.reduce(
             (acc, item) => acc + item.price * item.quantity, 0
      );

     const shippingPrice = itemsPrice >= 999 ? 0 : 99;
     const taxPrice = Math.round(itemsPrice * 0.18);
     const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleIncrease =(item) =>{
      dispatch(updateQuantity({
        productId : item.product,
        quantity : item.quantity + 1,
      }))
    }
      const handleDecrease =(item) =>{
        if(item.quantity <=1) return;
      dispatch(updateQuantity({
        productId : item.product,
        quantity : item.quantity - 1,
      }))
    }
    const handleDelete =(productId) =>{
     // console.log(productId)
      dispatch(removeCartItems(productId));
     }

    
    useEffect(() => {
          dispatch(getCartItems());
       }, [dispatch]);

        useEffect(()=>{
         if(error){
            toast.error("Failed to delete");
            dispatch(removeError())
           }
           if(success){
            toast.success("Successfully deleted ");
            dispatch(removeSuccess())
           }
   },[dispatch,error,success])
   

  return (
   
    <div className ="bg-[#DBE4C9] min-h-screen px-10 py-5 w-full  overflow-hidden">
      <PageTitle title={"Cart | E-Commerce"} />
       <CheckOutSteps  steps={1} />
        <div className ="flex items-center flex-col gap-5 mt-5 w-full  ">
        <h2 className="text-xl text-[#718b13] font-bold"> My Cart</h2>
        <div className="flex gap-7 flex-col w-full lg:flex-row ">
        <div className ="bg-white p-6 rounded-lg shadow-md  w-full lg:w-2/3 ">
        {/*cart section */}
            <div className=" ">
            <p className=" text-sm text-gray-500">Total Items({cartItems.length})</p>
            <div className= "flex flex-col gap-2 mt-4 ">
                {cartItems.map((cartItem) =>(
                    
            <div key={cartItem.product} className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-gray-100 rounded-lg" > 

    <div className="flex gap-4">
         <img src={cartItem.image} alt={cartItem.name} className="w-20 h-20 object-cover rounded-lg cursor-pointer"/>

      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-lg text-[#718b13]"> {cartItem.name}</h1>
        <p className="text-gray-600"> Quantity: {cartItem.quantity}kg</p>
        <p className="font-medium text-green-700">  ₹{cartItem.price}</p>
      </div>

    </div>

    
    <div className="flex items-center gap-3">
         <button onClick={() => handleDecrease(cartItem)} className="bg-[#d1d4c3] px-2 sm:px-3 sm:py-1  rounded hover:bg-[#718b13] hover:text-white transition cursor-pointer" >
           <span className="text-md">-</span>
         </button>
         <span className="font-semibold">
             {cartItem.quantity}
         </span>
        <button  onClick={() => handleIncrease(cartItem)} className="bg-[#d1d4c3] px-1.5 sm:px-2.5 sm:py-1 rounded hover:bg-[#718b13] hover:text-white transition cursor-pointer" >
          +
         </button>
       <button onClick={() => handleDelete(cartItem.product)} className="text-red-500 hover:text-red-700 ml-3 cursor-pointer">Delete</button>
    </div>
 </div>
      ))}
    </div>
             </div>
           </div>


         {/*order summary */}
         <div className="bg-white p-7 rounded-lg shadow-md w-full lg:w-1/3 h-90"> 
         <h1 className ="text-md font-bold text-[#718b13] mb-2 ">Order summary</h1>
         {/* Items breakdown */}
              <div className="space-y-3 text-sm text-gray-600 mb-4">
          <div className="flex justify-between">
             <span>Items ({cartItems.length})</span>
             <span className="font-medium text-gray-800">₹{itemsPrice}</span>
          </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className={`font-medium ${shippingPrice === 0 ? "text-green-600" : "text-gray-800"}`}>
            {shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span className="font-medium text-gray-800">₹{taxPrice}</span>
        </div>

        {itemsPrice < 999 && (
          <p className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            Add ₹{999 - itemsPrice} more for free delivery!
          </p>
        )}

      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Total */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-semibold">Total</span>
        <span className="text-xl font-semibold text-[#718b13]">₹{totalPrice}</span>
      </div>
      <p className="text-xs text-gray-400 mb-4">Inclusive of all taxes</p>

      {/* Checkout button */}
      <button
        onClick={() => window.location.href = "/shipping"}
        disabled={cartItems.length === 0}
        className="w-full bg-[#718b13] text-white py-3 rounded-xl text-sm 
                   font-medium hover:bg-[#5a6e0f] transition disabled:opacity-50 
                   disabled:cursor-not-allowed">
        Proceed to Checkout
      </button>
    
                

            </div>
       </div>
        </div>

   
    </div>
  )
}

export default Cart
