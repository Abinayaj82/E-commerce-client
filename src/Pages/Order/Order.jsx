import React from 'react'
import { useSelector}  from 'react-redux';
import { getMyOrders } from '../../features/Order/OrderSlice';
import { useDispatch} from 'react-redux'
import { useEffect} from 'react';
import { useNavigate} from 'react-router-dom'
import PageTitle from '../../Components/PageTitle'

const Order = () => {
  const { orders } = useSelector((state) => state.order);
  console.log("Orders in Order.jsx:", orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 useEffect(() =>{
    dispatch(getMyOrders());
 }, [dispatch]);



  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9] py-12">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

         <PageTitle title={"My Orders | E-Commerce"} />
         
      <div className ="relative bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[24px] shadow-2xl border border-white/40 w-full max-w-5xl z-10 m-4">
            <div className="mb-6 flex items-center gap-3">
               <div className="w-12 h-12 bg-[#718b13]/10 rounded-full flex items-center justify-center shadow-inner">
                 <span className="text-2xl">📦</span>
               </div>
               <div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-[#718b13] tracking-tight">My Orders</h1>
                  <p className="text-sm text-gray-500 mt-1">Track and manage your recent purchases.</p>
               </div>
            </div>

           {orders && orders.length >0?(
            <div className ="overflow-hidden rounded-2xl border border-gray-100 shadow-sm hidden md:block bg-white">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order._id} onClick={() => navigate(`/order/${order._id}`)} className="hover:bg-amber-50/50 transition-colors duration-200 cursor-pointer group">
                        <td className="py-4 px-6 text-sm font-bold text-gray-800 group-hover:text-[#718b13] transition-colors">#{order._id.slice(-8)}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-sm font-bold text-gray-900">₹{order.totalPrice}</td>
                        <td className="py-4 px-6 text-sm text-gray-600 font-medium"> {order.orderItems.length} items </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${order.orderStatus === "Delivered" ? "text-green-700 bg-green-50 border-green-200": "text-orange-700 bg-orange-50 border-orange-200"}`}>
                            {order.orderStatus === "Delivered" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                            {order.orderStatus !== "Delivered" && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>}
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
           ):(
             <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl opacity-50">🛒</span>
                 </div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
                 <p className="text-gray-500">Looks like you haven't made any purchases yet.</p>
             </div>
           )}

           {/* Mobile view */}
           <div className="md:hidden flex flex-col gap-4 mt-4">
             {orders && orders.map((order) => (
               <div key={order._id} onClick={() => navigate(`/order/${order._id}`)} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform" >
                 <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                   <div>
                     <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Order ID</span>
                     <span className="font-bold text-gray-800 text-lg">#{order._id.slice(-8)}</span>
                   </div>
                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${order.orderStatus === "Delivered" ? "text-green-700 bg-green-50 border-green-200": "text-orange-700 bg-orange-50 border-orange-200"}`}>
                      {order.orderStatus}
                   </span>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Date</span>
                     <span className="text-sm font-medium text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span>
                   </div>
                   <div>
                     <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Items</span>
                     <span className="text-sm font-medium text-gray-800">{order.orderItems.length}</span>
                   </div>
                   <div className="col-span-2 mt-2">
                     <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Total Amount</span>
                     <span className="text-xl font-bold text-[#718b13]">₹{order.totalPrice}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
      </div>
    </div>
  )
}

export default Order
