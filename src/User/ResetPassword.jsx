import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/User/UserSlice';
import { removeError, removeResetPasswordSuccess} from '../features/User/UserSlice'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import PageTitle from '../Components/PageTitle'
const ResetPassword = () => {
const {error, resetPasswordSuccess,loading} = useSelector((state) => state.user)
const dispatch = useDispatch();
const Navigate = useNavigate();
const { token } = useParams();

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");



const handleChange =(e) =>{
        if (e.target.name === "password") {
           setPassword(e.target.value);
        } else if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
}
    const handleSubmit =(e) =>{
          e.preventDefault();
          if(password !== confirmPassword){
            toast.error("Password do not match", {position:"top-center",
                autoClose:3000
            })
            return;
        }
          const data ={
            password,
            confirmPassword,
          };
          
          dispatch(resetPassword({token,userData:data}))
             
    }
     useEffect(()=>{
       if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                pauseOnHover: true,
            });
            dispatch(removeError());
        }
          
         if (resetPasswordSuccess) {
                toast.success("Password changed successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    pauseOnHover: true,
                });
                 dispatch(removeResetPasswordSuccess());
                 Navigate("/login")
            }
          

    }, [error,dispatch, resetPasswordSuccess])

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

         <PageTitle title={"Reset Password | E-Commerce"} />
         
      <div className ="relative bg-white/80 backdrop-blur-xl p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
        <form onSubmit={handleSubmit} className ="flex flex-col gap-5 text-sm">
            <div className ="mb-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#718b13]/10 mb-4 shadow-inner">
                   <span className="text-3xl">🔓</span>
                </div>
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">Reset Password</h2> 
                <p className="text-sm text-gray-500 mt-1">Please enter your new password below.</p>
            </div>
     
            <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">New Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChange} placeholder="Enter your new password"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Confirm your new password"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
        
            <div className="mt-2">
                <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
