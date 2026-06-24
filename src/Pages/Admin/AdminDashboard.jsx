import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllProducts } from '../../features/Admin/AdminSlice';
import { adminGetAllOrders } from '../../features/Admin/AdminSlice';
import { adminGetAllUsers } from '../../features/Admin/AdminSlice';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon, label, value, sub, bg, border, iconBg, onClick }) => (
  <div
    className={`rounded-2xl p-6 flex flex-col gap-1.5 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    style={{ border: `1px solid ${border}` }}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-500 text-[13px] font-medium">{label}</span>
      <div className="rounded-[10px] p-2" style={{ background: iconBg }}>{icon}</div>
    </div>
    <p className="text-gray-800 text-[32px] font-extrabold m-0 leading-none">{value}</p>
    {sub && <p className="text-gray-400 text-xs m-0">{sub}</p>}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-[#718b13] font-bold text-lg m-0 mb-4 tracking-wide">{children}</h2>
);

const statusColor = (s) => {
  if (!s) return { color: 'text-gray-500', bg: 'bg-gray-100' };
  const map = {
    Delivered: { color: 'text-green-600', bg: 'bg-green-100' },
    Processing: { color: 'text-yellow-600', bg: 'bg-yellow-100' },
    Shipped: { color: 'text-blue-600', bg: 'bg-blue-100' },
    Cancelled: { color: 'text-red-600', bg: 'bg-red-100' },
  };
  return map[s] || { color: 'text-gray-500', bg: 'bg-gray-100' };
};

/* ── component ───────────────────────────────────────────────── */
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, productCount, orders, totalAmount, users, userCount, loading } = useSelector(s => s.admin);

  useEffect(() => {
    dispatch(adminGetAllProducts());
    dispatch(adminGetAllOrders());
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  const pendingOrders = orders.filter(o => o.orderStatus !== 'Delivered').length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const statCards = [
    {
      label: 'Total Revenue',
      value: `₹${(totalAmount || 0).toLocaleString('en-IN')}`,
      sub: 'Across all orders',
      icon: <svg className="w-5 h-5 text-[#718b13]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      bg: 'rgba(113,139,19,0.05)',
      border: 'rgba(113,139,19,0.15)',
      iconBg: 'rgba(113,139,19,0.1)',
      onClick: () => navigate('/admin/orders'),
    },
    {
      label: 'Total Products',
      value: productCount,
      sub: 'In your catalogue',
      icon: <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>,
      bg: 'rgba(37,99,235,0.05)',
      border: 'rgba(37,99,235,0.15)',
      iconBg: 'rgba(37,99,235,0.1)',
      onClick: () => navigate('/admin/products'),
    },
    {
      label: 'Total Orders',
      value: orders.length,
      sub: `${pendingOrders} pending`,
      icon: <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      bg: 'rgba(217,119,6,0.05)',
      border: 'rgba(217,119,6,0.15)',
      iconBg: 'rgba(217,119,6,0.1)',
      onClick: () => navigate('/admin/orders'),
    },
    {
      label: 'Total Users',
      value: userCount,
      sub: 'Registered users',
      icon: <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>,
      bg: 'rgba(147,51,234,0.05)',
      border: 'rgba(147,51,234,0.15)',
      iconBg: 'rgba(147,51,234,0.1)',
      onClick: () => navigate('/admin/users'),
    },
  ];

  return (
    <div className="max-w-full m-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#718b13] font-extrabold text-3xl m-0 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 mb-0 text-sm">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      {loading && !orders.length ? (
        <div className="text-gray-500 text-center py-16">Loading data…</div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-8">
            {statCards.map(c => <StatCard key={c.label} {...c} />)}
          </div>

          {/* Recent Orders */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Recent Orders</SectionTitle>
              <button
                onClick={() => navigate('/admin/orders')}
                className="bg-transparent border border-[#718b13]/40 text-[#718b13] rounded-lg py-1.5 px-3.5 text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#718b13]/10"
              >
                View All
              </button>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
              {recentOrders.length === 0 ? (
                <p className="text-gray-400 text-center p-8 m-0">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        {['Order ID', 'Date', 'Amount', 'Items', 'Status'].map(h => (
                          <th key={h} className="py-3.5 px-4 text-left text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, i) => {
                        const sc = statusColor(order.orderStatus);
                        return (
                          <tr
                            key={order._id}
                            onClick={() => navigate('/admin/orders')}
                            className={`cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${i < recentOrders.length - 1 ? 'border-b border-gray-100' : 'border-none'}`}
                          >
                            <td className="py-[13px] px-4 text-[#718b13] text-[13px] font-mono">#{order._id?.slice(-8)}</td>
                            <td className="py-[13px] px-4 text-gray-600 text-[13px]">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                            <td className="py-[13px] px-4 text-gray-800 text-[13px] font-semibold">₹{order.totalPrice?.toLocaleString('en-IN')}</td>
                            <td className="py-[13px] px-4 text-gray-600 text-[13px]">{order.orderItems?.length}</td>
                            <td className="py-[13px] px-4">
                              <span className={`${sc.bg} ${sc.color} rounded-full py-[3px] px-3 text-xs font-semibold`}>{order.orderStatus}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Recent Users */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Recent Users</SectionTitle>
              <button
                onClick={() => navigate('/admin/users')}
                className="bg-transparent border border-[#718b13]/40 text-[#718b13] rounded-lg py-1.5 px-3.5 text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#718b13]/10"
              >
                View All
              </button>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
              {recentUsers.length === 0 ? (
                <p className="text-gray-400 text-center p-8 m-0">No users yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        {['Name', 'Email', 'Role', 'Joined'].map(h => (
                          <th key={h} className="py-3.5 px-4 text-left text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, i) => (
                        <tr
                          key={user._id}
                          className={`cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${i < recentUsers.length - 1 ? 'border-b border-gray-100' : 'border-none'}`}
                        >
                          <td className="py-[13px] px-4 text-gray-800 text-[13px] font-medium">{user.name}</td>
                          <td className="py-[13px] px-4 text-gray-500 text-[13px]">{user.email}</td>
                          <td className="py-[13px] px-4">
                            <span className={`${user.role === 'admin' ? 'bg-[#718b13]/10 text-[#718b13]' : 'bg-gray-100 text-gray-500'} rounded-full py-[3px] px-3 text-xs font-semibold`}>{user.role}</span>
                          </td>
                          <td className="py-[13px] px-4 text-gray-400 text-[13px]">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
