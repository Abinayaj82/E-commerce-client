import React, {useRef} from 'react'
import CheckOutSteps from '../../Components/CheckOutSteps'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import { MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { saveAddress } from '../../features/User/UserSlice';
import { useEffect} from 'react'
import toast from 'react-hot-toast';
import { removeError, removeSuccess} from "../../features/User/UserSlice"
import { paymentProcess} from '../../features/Payment/PaymentSlice';
import { paymentVerify} from '../../features/Payment/PaymentSlice';
import { removeVerifySuccess} from '../../features/Payment/PaymentSlice';
import { createOrder} from '../../features/Order/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart} from '../../features/Cart/CartSlice';
import { removeOrderError, removeOrderSuccess} from '../../features/Order/OrderSlice';
import PageTitle from '../../Components/PageTitle'


const Shipping = () => {
  const paymentRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { cartItems , loading, error,success} = useSelector((state)=>state.cart)
  // const {  error, success, order} = useSelector((state)=> state.payment)
const { shippingAddress} = useSelector((state)=> state.user);

const { orderError, orderSuccess} = useSelector((state)=> state.order);
 
    const itemsPrice = cartItems.reduce(
             (acc, item) => acc + item.price * item.quantity, 0
      );

     const shippingPrice = itemsPrice >= 999 ? 0 : 99;
     const taxPrice = Math.round(itemsPrice * 0.18);
     const totalPrice = itemsPrice + shippingPrice + taxPrice;
      const [shippingInfo, setShippingInfo] =
   useState({
      fullName: "",
      phoneNo: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      landmark: "",
   });
   const handleChange = (e) => {

   setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
   });

};
const currentShippingInfo = { ...shippingInfo };
console.log(shippingInfo)
   // handle payment
   const handlePayment = async () => {
   if( !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
     !shippingInfo.phoneNo ||
      !shippingInfo.fullName||
    !shippingInfo.pinCode){
       toast.error("shipping Address not found")
       return
   }
   const result =
      await dispatch(paymentProcess(totalPrice));

   if (paymentProcess.fulfilled.match(result)) {

      const razorpayOrder =result.payload.order;
      const options = {
              key: "rzp_test_bjixu96qD2TWQh",
              amount: razorpayOrder.amount,
              currency:razorpayOrder.currency,
              name: "My Ecommerce",
              description:"Order Payment",
               order_id:razorpayOrder.id,
    handler: async function (response) {

      const paymentData ={
         razorpay_order_id : response.razorpay_order_id,
          razorpay_payment_id : response.razorpay_payment_id,
           razorpay_signature : response.razorpay_signature,


      }
       const verifyResult = await (dispatch(paymentVerify(paymentData)));
     // console.log("Payment data sent for verification:", paymentData);
         
    if(paymentVerify.fulfilled.match(verifyResult)){
          toast.success("Payment verified successfully")

       const orderData = {
            shippingAddress : currentShippingInfo,
           orderItems: cartItems,
           paymentInfo: {
                     id:response.razorpay_payment_id,
                     status: "Paid",
             },
             itemPrice: itemsPrice,
              taxPrice: taxPrice,
             shippingPrice,
             totalPrice,
           };
          // console.log("Inside handler:", orderData);
          await dispatch(createOrder(orderData))
          dispatch(clearCart());
          navigate("/");
    }
    },    
        theme: {
              color: "#718b13",
         },
      };

      const razor =
         new window.Razorpay(options);
         razor.open();
   }
};

  const handleProceeedToPay =(e) =>{
        e.preventDefault();
        dispatch(saveAddress(shippingInfo));
       // console.log("Address data:", shippingInfo)

        setTimeout(() =>{
              paymentRef.current?.scrollIntoView({
               behavior: "smooth",
      });
        }, 100)
       
  }
      useEffect(()=>{
        if(success){
                toast.success("Address saved successfully")
                 dispatch(removeSuccess())
        }
        if(error){
          toast.error(error);
          dispatch(removeError())
        }
      },[success,error,dispatch])
      useEffect(() =>{
  if(success){
          toast.success("Payment verified successfully")
          dispatch(removeVerifySuccess())
        }
      },[success, dispatch])
  
      useEffect(() => {
  if (shippingAddress) {
    setShippingInfo(shippingAddress);
  }
}, [shippingAddress]);

 useEffect(() =>{
  if(orderError){
    toast.error(orderError);
    dispatch(removeOrderError())
  }
  if(orderSuccess){
    toast.success("Order created successfully")
    dispatch(removeOrderSuccess())
 }
  },[orderError, orderSuccess, dispatch])
  return (
        <div className ="bg-[#DBE4C9] min-h-screen px-1 lg:px-6 py-5 w-full">
           <PageTitle title={"Checkout | E-Commerce"} />
          <CheckOutSteps  steps={2} />
    <div className =" flex flex-col gap-3 md:flex-row min-h-screen px-1  py-5 w-full">
    
    
      {/* Left side*/}
      <div className =" p-1  rounded-lg flex flex-col  gap-3 w-full  lg:w-2/3">
      <div className ="bg-white p-6 rounded-lg shadow-md">
        <div className ="flex gap-1">
        <MapPin color ="#718b13"size={20} className ="mt-1" />
          <h1 className="text-lg text-[#718b13] font-semibold mb-2"> Delivery address</h1>
          </div>
      <form onSubmit ={handleProceeedToPay} className ="flex flex-col   gap-3"> 
        <div className= "flex flex-col md:flex-row gap-3"> 
            <div className =" flex flex-col ">
            <label htmlFor='FullName' className="block text-sm font-medium text-gray-700 mb-3">Full Name</label>
            <input type ="text" name="fullName" value={shippingInfo.fullName} onChange={handleChange} placeholder ="Full Name " required className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" ></input>
            </div>
              <div className =" flex flex-col">
            <label htmlFor='PhoneNo' className="block text-sm font-medium text-gray-700 mb-3" >Phone No.</label>
            <input type ="number" value={shippingInfo.phoneNo} onChange={handleChange} name="phoneNo" placeholder ="Phone No. " required className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" ></input>
        </div>
        </div>
            <label htmlFor='Address'className="block text-sm font-medium text-gray-700 " >Address line</label>
            <input type ="text" name="address" value={shippingInfo.address} onChange={handleChange} placeholder ="Address " required className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"  ></input>
            <div className= "flex flex-col md:flex-row gap-3">
                <div className =" flex flex-col ">
                <label htmlFor='City' className="block text-sm font-medium text-gray-700 mb-3" >City</label>
                <input type ="text" name="city" value={shippingInfo.city} onChange={handleChange} placeholder ="City " required className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" ></input>
                </div>
                 <div className =" flex flex-col">
              <label htmlFor='State' className="block text-sm font-medium text-gray-700 mb-3">State</label>
            <input type ="text" name="state" value={shippingInfo.state} onChange={handleChange} placeholder ="State " required className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" ></input>
            </div>
            </div>
            <div className= "flex flex-col md:flex-row gap-3 ">
                <div className =" flex flex-col">
                <label htmlFor='pinCode'className="block text-sm font-medium text-gray-700 mb-3" >Pincode</label>
                <input type ="number" name="pinCode" value={shippingInfo.pinCode} onChange={handleChange} placeholder ="Pincode " required className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"></input>
            </div>
             <div className =" flex flex-col">
              <label htmlFor='Landmark' className="block text-sm font-medium text-gray-700 mb-3">Landmark (optional)</label>
            <input type ="text" name="landmark" value={shippingInfo.landmark} onChange={handleChange} placeholder ="landmark "  className="border   placeholder:text-gray-400  border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" ></input>
               </div>
            </div>
             <button type="submit" className="w-full bg-[#718b13] text-white py-3 rounded-xl text-sm 
                   font-medium hover:bg-[#5a6e0f] transition disabled:opacity-50 cursor-pointer
                   disabled:cursor-not-allowed" >
        Save Address
      </button>
      </form>
      </div>

       {/* payment method */}
       
                <div  ref={paymentRef} className="bg-white p-6 rounded-lg shadow-md">
               <h2 className="text-lg  text-[#718b13] font-semibold mb-3"> Payment method</h2>
               <div>
                <label className ="ml-2 mr-4">
                  <input type ="radio" name ="payment" />
                  <span className ="ml-2 text-gray-700">Cash on Delivery</span>
                </label>
                 <label className =" ">
                  <input type ="radio" name ="payment" />
                  <span className ="ml-2 text-gray-700">Razorpay</span>
                </label>
                
                </div>
           </div>
       
      
       </div>

 {/* Right side*/}
    <div className ="p-1  rounded-lg flex flex-col gap-5  w-full lg:w-1/3">
      {/*order items */}
      <div className="bg-white p-6 rounded-lg shadow-md ">
         <p className ="text-lg font-semibold text-[#718b13]  mb-3"> Items ({cartItems.length})</p>
         <div className ="h-auto">
          {cartItems.map((item) =>(
            <div key={item.product} className="flex items-center gap-3 mb-4 border-b border-gray-300 pb-2">
              <img src={item.image} alt={item.name} className="w-9 h-9 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}kg</p>
              </div>
              <div className ="text-sm font-medium text-green-700">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
         </div>
         <div className="border-t border-gray-400 pt-1">
            <div className ="flex justify-between text-sm text-gray-600 mt-4 border-b border-gray-300 pb-2">
              <p>Subtotal</p>
              <p className =" font-medium text-gray-800">₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
            </div>
              
              <div className ="flex justify-between text-sm text-gray-600 mt-4 border-b border-gray-300 pb-2">
                 <span>Delivery</span>
               <span className={`font-medium ${shippingPrice === 0 ? "text-green-600" : "text-gray-800"}`}>
               {shippingPrice === 0 ? "Free" : `₹${shippingPrice}`}
               </span>
               </div>
              <div className ="flex justify-between text-sm text-gray-600 mt-4 border-b border-gray-300 pb-2">
               <span>GST (18%)</span>
               <span className="font-medium text-gray-800">₹{taxPrice}</span>
            </div>
              <div className ="flex justify-between text-sm text-gray-600 mt-4 ">
              <strong>Total</strong>
              <p className="text-lg font-semibold text-green-700">₹{totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handlePayment} className ="w-full bg-[#718b13] text-white py-3 rounded-xl text-sm mt-2 font-medium hover:bg-[#5a6e0f] cursor-pointer">
               Pay ₹{totalPrice.toFixed(2)}
            </button>

         </div>
      </div>
     
    
      </div>
     
    </div>
    </div>
  )
}

export default Shipping
