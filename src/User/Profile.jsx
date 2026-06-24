import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile } from '../features/User/UserSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PageTitle from '../Components/PageTitle'

const Profile = () => {
    const {isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserProfile());
        }
    }, [dispatch, isAuthenticated]);
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-[#DBE4C9]">
         {/* Decorative blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#97b03a] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#718b13] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <PageTitle title={"My Profile | E-Commerce"} />
          
      <div className ="relative bg-white/80 backdrop-blur-xl p-10 rounded-[24px] shadow-2xl border border-white/40 w-full md:w-3/4 lg:w-1/2 max-w-md z-10 m-4">
            <div className ="mb-6 text-center">
                <h2 className="text-2xl text-gray-800 font-extrabold tracking-tight">My Profile</h2> 
            </div>

            <div className="flex flex-col gap-5">
                <div className="relative mx-auto w-32 h-32">
                    <img src={user?.user?.avatar?.url || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"/>
                </div>
                
                <div className="flex flex-col gap-4 mt-2">
                    <div className ="w-full bg-white/50 border border-gray-100 p-4 rounded-xl shadow-sm">
                        <p className ="text-xs font-semibold uppercase tracking-wide text-[#718b13] mb-1">Name</p>
                        <p className="text-base text-gray-800 font-medium">{user?.user?.name}</p>
                    </div>
                    <div className ="w-full bg-white/50 border border-gray-100 p-4 rounded-xl shadow-sm">
                        <p className ="text-xs font-semibold uppercase tracking-wide text-[#718b13] mb-1">Email</p>
                        <p className="text-base text-gray-800 font-medium">{user?.user?.email}</p>
                    </div>
                </div>
                
                <div className="mt-4 text-center">
                    <NavLink to="/update-profile">
                        <button className="w-full bg-gradient-to-r from-[#718b13] to-[#97b03a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#718b13]/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#718b13]/40 focus:outline-none focus:ring-4 focus:ring-[#718b13]/30">
                            Edit Profile
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
