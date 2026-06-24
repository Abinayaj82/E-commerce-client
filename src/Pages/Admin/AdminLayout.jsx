import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/User/UserSlice';
import PageTitle from '../../Components/PageTitle';

const navItems = [
  {
    to: '/admin/dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: 'Dashboard',
  },
  {
    to: '/admin/products',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
    label: 'Products',
  },
  {
    to: '/admin/orders',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    label: 'Orders',
  },
  {
    to: '/admin/users',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    label: 'Users',
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#DBE4C9]">
      <PageTitle title="Admin Dashboard | FreshKart" />

      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-[250px]' : 'w-[70px]'}
          transition-all duration-300
          bg-white shadow-sm
          border-r border-gray-200
          flex flex-col
          sticky top-0 h-screen z-40
          overflow-x-hidden shrink-0
        `}
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-5 flex items-center gap-3 border-b border-gray-200">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#718b13] to-[#a3c41a] flex items-center justify-center shrink-0">
            <span className="text-white font-extrabold text-base">F</span>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <p className="text-[#718b13] font-bold text-base m-0">FreshKart</p>
              <p className="text-gray-500 text-[11px] m-0">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2.5 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                text-sm
                transition-all
                whitespace-nowrap overflow-hidden
                ${
                  isActive
                    ? 'text-[#718b13] bg-[#718b13]/10 border border-[#718b13]/20 font-semibold'
                    : 'text-gray-600 border border-transparent hover:bg-gray-100 hover:text-gray-800'
                }
                `
              }
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="transition-opacity duration-200">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="py-4 px-2.5 border-t border-gray-200 flex flex-col gap-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 py-2.5 px-3.5 rounded-[10px] bg-transparent border border-transparent text-gray-500 cursor-pointer text-sm whitespace-nowrap overflow-hidden transition-all duration-200 hover:bg-gray-100 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {sidebarOpen && <span>Home</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-2.5 px-3.5 rounded-[10px] bg-transparent border border-transparent text-red-500 cursor-pointer text-sm whitespace-nowrap overflow-hidden transition-all duration-200 hover:bg-red-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 h-[60px] flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white border border-gray-200 rounded-lg p-1.5 cursor-pointer text-[#718b13] flex items-center transition-all duration-200 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-gray-500 text-sm">Welcome back, <strong className="text-[#718b13]">Admin</strong></span>
          <div className="ml-auto w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#718b13] to-[#a3c41a] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
