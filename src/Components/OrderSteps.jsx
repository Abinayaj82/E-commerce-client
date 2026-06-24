import React from 'react'
import { Check } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { Package } from 'lucide-react';
import { Truck } from 'lucide-react';
import {useSelector }  from 'react-redux'

const OrderSteps = ({steps}) => {
        const { order } = useSelector((state) => state.order);
  return (
     <div className="flex flex-row w-full h-auto   p-5">
         {/* payment step */}
         <div className ="flex flex-col gap-2">

           <div className="flex flex-row">
             <div className ="flex flex-col gap-2">
        <div className={`w-3 h-3 rounded-full ${steps >= 1 ? 'bg-[#718b13]' : 'bg-gray-300'} text-white flex items-center justify-center`}></div>
         <div className={`ml-[5px] flex items-start h-12 border-l-2 border-dashed ${ steps >= 2 ? "border-[#718b13]" : "border-gray-300" }`}></div>
            </div>
               <CircleCheck size={20} className="text-[#5677e3] ml-2" />
               <div className ="flex flex-col gap-1"> 
                
                <span className="ml-2 text-sm  text-gray-800">Payment</span>
                <p className=" ml-2 text-xs text-gray-500 ">Paid At : {new Date(order?.paidAt).toLocaleString("en-IN",
                    {day:"2-digit" ,year:"numeric",month:"short", hour:"numeric", digit:"2-digit" 
                })
                }</p>
                </div>
            </div>
   {/* processing step */}
 <div className="flex flex-row">
             <div className ="flex flex-col gap-2">
        <div className={`w-3 h-3 rounded-full ${steps >= 2 ? 'bg-[#718b13]' : 'bg-gray-300'} text-white flex items-center justify-center`}></div>
         <div className={`ml-[5px] flex items-start h-12 border-l-2 border-dashed ${ steps >= 3 ? "border-[#718b13]" : "border-gray-300" }`}></div>
         </div>
             <Package size={20} className="text-[#5677e3] ml-2" />
          <div className ="flex flex-col gap-1">
                <span className="ml-2 text-sm  text-gray-800">Processing</span>
                <p className=" ml-2 text-xs text-gray-500 ">Processed  At : {new Date().toLocaleString("en-IN",
                    {day:"2-digit" ,year:"numeric",month:"short", hour:"numeric", digit:"2-digit" 
                })
                }</p>
                </div>

                </div>

                {/* delivered step */}
        <div className="flex flex-row">
             <div className ="flex flex-col gap-2">
        <div className={`w-3 h-3 rounded-full ${steps >= 3 ? 'bg-[#718b13]' : 'bg-gray-300'} text-white flex items-center justify-center`}></div>
         </div>
          <Truck size={20} className="text-[#5677e3] ml-2" />
              <div className ="flex flex-col gap-1">
                <span className="ml-2 text-sm  text-gray-800">Delivered</span>
                <p className=" ml-2 text-xs text-gray-500 ">Delivered At : {new Date(order?.paidAt).toLocaleString("en-IN",
                    {day:"2-digit" ,year:"numeric",month:"short", hour:"numeric", digit:"2-digit" 
                })
            }</p>
                </div>
                </div>

         </div>

         {/* labels */}
         
      
       
    </div>
  )
}

export default OrderSteps

            
              


    