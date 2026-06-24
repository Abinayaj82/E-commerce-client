import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../features/User/UserSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { removeError,removeUpdatePasswordSuccess } from '../features/User/UserSlice';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Components/PageTitle'

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //const { user} = useSelector((state)=>state.user);
  const { error , updatePasswordSuccess} = useSelector((state)=>state.user)
  

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(formData));
      
  };
  useEffect(()=>{
        if (error) {
            toast.error(error);
            dispatch(removeError())
        }
        if(updatePasswordSuccess){
          toast.success("Password updated successfully")
          dispatch(removeUpdatePasswordSuccess()),
          navigate('/profile')
        }
  },[error, updatePasswordSuccess ,dispatch,navigate])
 
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

         <PageTitle title={"Change Password | E-Commerce"} />
         
      <div className ="relative bg-white/80 backdrop-blur-xl p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
        <form onSubmit={handleSubmit} className ="flex flex-col gap-5 text-sm">
            <div className ="mb-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#718b13]/10 mb-4 shadow-inner">
                   <span className="text-3xl">🛡️</span>
                </div>
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">Update Password</h2> 
                <p className="text-sm text-gray-500 mt-1">Keep your account secure.</p>
            </div>
     
            <div className="flex flex-col">
                <label htmlFor="oldPassword" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Old Password</label>
                <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter old password"  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">New Password</label>
                <input type="password" id="newPassword" placeholder='Enter new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 text-sm outline-none transition-all duration-200 focus:border-[#718b13] focus:ring-4 focus:ring-[#718b13]/10 placeholder:text-gray-400"/>
            </div>
        
            <div className="mt-2">
                <button type="submit" className={`w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30`}>
                    Update Password
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
