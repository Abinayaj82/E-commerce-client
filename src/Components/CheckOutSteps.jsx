import React from 'react'
import { Check } from 'lucide-react';
import { CircleArrowLeft } from 'lucide-react';


const CheckOutSteps = ({steps}) => {
  return (
    <div className="flex  flex-row w-full gap-4 ">
      {/* Back button */}
      <div className="  w-auto flex justify-start">
      <button className="cursor-pointer "
      onClick ={() => window.history.back()}>   
        <CircleArrowLeft size={33}  className ="text-[#718b13] w-6 sm:w-8 hover:text-[#5a6f0f] transition duration-300"/>
        </button>
        </div>
        {/* Progress bar */}
        <div className="flex items-center w-full   ">
            <div className="flex items-center sm:flex-row flex-col gap-1">
                <div className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full ${steps >= 1 ? 'bg-[#718b13]' : 'bg-gray-300'} text-white flex items-center justify-center`}>{steps >= 1 ? <Check size={19} className="w-3 sm:w-7" /> : '1'}</div>
                <span className="ml-2 text-sm text-gray-600">Cart</span>
            </div>
            <div className="flex-1 h-1  bg-gray-300  mx-4"></div>
            <div className="flex items-center sm:flex-row flex-col gap-1">
                <div className={`w-5 h-5 sm:w-8 sm:h-8  rounded-full ${steps >= 2 ? 'bg-[#718b13]' : 'bg-gray-300'} text-white flex items-center justify-center`}>{steps >= 2 ? <Check size={19} className="w-3 sm:w-7" /> : '2'}</div>
                <span className="ml-2 text-sm text-gray-600">Checkout</span>
            </div>
              <div className="flex-1 h-1 bg-gray-300 mx-3 "></div>
            <div className="flex items-center sm:flex-row flex-col gap-1">
                <div className={`w-5 h-5 sm:w-8 sm:h-8  rounded-full ${steps >= 3 ? 'bg-[#718b13]' : 'bg-gray-300'} text-white flex items-center justify-center`}>{steps >= 3 ? <Check size={19}  className="w-3 sm:w-7" /> : '3'}</div>
                <span className="ml-2 text-sm text-gray-600">Payment</span>
            </div>
        </div>
    </div>
  )
}

export default CheckOutSteps
