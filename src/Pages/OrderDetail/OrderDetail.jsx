import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrderDetails } from '../../features/Order/OrderSlice';
import { useSelector } from 'react-redux'
import OrderSteps from '../../Components/OrderSteps';
import { CircleArrowLeft } from 'lucide-react';
import PageTitle from '../../Components/PageTitle'

const OrderDetail = () => {
    const { order } = useSelector((state) => state.order);
    console.log(order);
    const orderId = window.location.pathname.split("/").pop();
    const dispatch = useDispatch();
    const currentStep = order?.orderStatus === "Delivered" ? 3 : order?.orderStatus === "Processing" ? 2 : order?.paymentInfo?.status === "Paid" ? 1 : 0;
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        // console.log(orderId);
    }, [dispatch, orderId])

    return (
        <div className="bg-[#DBE4C9] min-h-screen p-6 w-full">
            <PageTitle title={`Order No. #${orderId?.slice(-8)}`} />
            <div className=" flex gap-4 items-center mb-6">
                <button className="cursor-pointer px-2 py-2  "
                    onClick={() => window.history.back()}>
                    <CircleArrowLeft size={33} className="text-[#718b13] w-5 sm:w-8 hover:text-[#5a6f0f] transition duration-300" />
                </button>
                <h1 className="text-lg sm:text-xl font-bold text-gray-700">Order #{orderId.slice(-8)}</h1>
                <p className="text-sm  text-green-500 "><strong>{order?.paymentInfo?.status}</strong></p>
            </div>
            <div className="flex  flex-col md:flex-row gap-5 w-full">
                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-3/4 ">

                    <h1 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h1>
                    {order?.orderItems?.map((item) => (
                        <div key={item._id} className="flex items-center justify-between gap-4 mb-4 border-b border-gray-200 pb-4" >
                            <div className="flex item-center gap-4">
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                                <div>
                                    <p>{item.name} </p>
                                    <p> Quantity: {item.quantity} kg</p>
                                </div>
                            </div>
                            <p> ₹{item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="mt-4 border-t border-gray-200 ">
                        <h1 className="text-lg font-semibold text-gray-800 mb-4 mt-4">Order Summary</h1>
                        <div className="flex items-center justify-between border-b border-gray-300 pb-3 gap-4 mb-2">
                            <span >Shipping Price</span>
                            <span > ₹{order?.shippingPrice}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-300 pb-3 gap-4 mb-2">
                            <span >Tax Price</span>
                            <span > ₹{order?.taxPrice}</span>
                        </div>
                        <div className=" flex items-center justify-between  border-b border-gray-300 pb-3 gap-4 mb-2">
                            <span >Total Price</span>
                            <span className="font-bold text-lg text-green-500"> ₹{order?.totalPrice}</span>
                        </div>


                    </div>
                </div>


                {/*Right section */}

                <div className=" flex flex-col gap-4 w-full md:w-1/4">
                    <div className=" h-auto bg-white rounded-lg shadow-md">
                        <OrderSteps steps={currentStep} />
                    </div>
                    <div className="bg-white p-6 flex flex-col  rounded-lg shadow-md w-full mt-6">

                        <h2 className=" text-xl text-[#718b13] font-bold mb-2  ">Shipping Information</h2>
                        <p><strong>{order?.shippingAddress?.fullName}</strong></p>
                        <p>{order?.shippingAddress?.address}</p>
                        <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.pinCode} </p>
                        <p>+91 {order?.shippingAddress?.phoneNo}</p>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default OrderDetail
