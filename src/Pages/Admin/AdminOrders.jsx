import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminGetAllOrders,
  adminUpdateOrderStatus,
  adminDeleteOrder,
  clearAdminError,
  clearAdminSuccess,
} from '../../features/Admin/AdminSlice';

/* ─── helpers ───────────────────────────────────────────────── */
const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusStyle = (s) => {
  const m = {
    Delivered: { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
    Processing: { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
    Shipped: { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
    Cancelled: { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' },
  };
  return m[s] || { color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' };
};

/* ─── Status modal ──────────────────────────────────────────── */
const StatusModal = ({ order, onClose, onSave, loading }) => {
  const [status, setStatus] = useState(order.orderStatus || 'Processing');
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-lg w-full max-w-[380px] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#718b13] font-extrabold text-lg m-0">Update Order Status</h2>
          <button onClick={onClose} className="bg-transparent border-none text-gray-400 hover:text-gray-600 cursor-pointer text-[22px] leading-none">✕</button>
        </div>
        <p className="text-gray-500 text-[13px] m-0 mb-4">Order <strong className="text-gray-800">#{order._id?.slice(-8)}</strong></p>
        <div className="flex flex-col gap-2.5 mb-6">
          {ORDER_STATUSES.map((s) => {
            const sc = statusStyle(s);
            const active = status === s;
            return (
              <button key={s} onClick={() => setStatus(s)} className={`px-4 py-[11px] rounded-[10px] text-sm text-left transition-all duration-200 ${active ? `${sc.bg} border ${sc.border} ${sc.color} font-bold` : 'bg-transparent border border-gray-200 text-gray-500 font-normal hover:bg-gray-50'}`}>
                {active ? '● ' : '○ '}{s}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 px-4 rounded-[10px] bg-white text-gray-600 border border-gray-200 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(order._id, status)} disabled={loading} className={`flex-1 py-2.5 px-4 rounded-[10px] bg-gradient-to-br from-[#718b13] to-[#a3c41a] text-white border border-transparent text-xs font-semibold cursor-pointer transition-all duration-200 ${loading ? 'opacity-60' : 'opacity-100 hover:shadow-md'}`}>
            {loading ? 'Updating…' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── main ──────────────────────────────────────────────────── */
const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, totalAmount, loading, error, success } = useSelector(s => s.admin);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(adminGetAllOrders()); }, [dispatch]);

  useEffect(() => {
    if (success) { setEditOrder(null); setDeleteId(null); dispatch(clearAdminSuccess()); dispatch(adminGetAllOrders()); }
    if (error) { const t = setTimeout(() => dispatch(clearAdminError()), 4000); return () => clearTimeout(t); }
  }, [success, error, dispatch]);

  const filtered = orders
    .filter(o => filterStatus === 'All' || o.orderStatus === filterStatus)
    .filter(o => o._id?.toLowerCase().includes(search.toLowerCase()) || o.user?.name?.toLowerCase().includes(search.toLowerCase()));

  const filterTabs = ['All', ...ORDER_STATUSES];

  return (
    <div className="max-w-[1200px] mx-auto">
      {error && <div className="fixed top-6 right-6 z-[9999] px-[22px] py-[13px] rounded-xl bg-red-100 border border-red-200 text-red-600 font-semibold text-sm shadow-sm">⚠ {error}</div>}
      {success && <div className="fixed top-6 right-6 z-[9999] px-[22px] py-[13px] rounded-xl bg-green-100 border border-green-200 text-green-600 font-semibold text-sm shadow-sm">✓ Order updated successfully!</div>}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#718b13] font-extrabold text-[26px] m-0">
          Orders <span className="text-gray-400 text-base font-normal">({orders.length})</span>
        </h1>
        <div className="bg-[#718b13]/10 border border-[#718b13]/20 rounded-xl py-2.5 px-5 text-[#718b13] font-bold text-[15px]">
          Total: ₹{(totalAmount || 0).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {filterTabs.map((t) => {
          const sc = statusStyle(t);
          const active = filterStatus === t;
          return (
            <button key={t} onClick={() => setFilterStatus(t)} className={`py-[7px] px-4 rounded-full text-[13px] transition-all duration-200 cursor-pointer ${active ? (t === 'All' ? 'font-bold bg-[#718b13]/10 text-[#718b13] border border-[#718b13]/20' : `font-bold ${sc.bg} ${sc.color} border ${sc.border}`) : 'font-normal bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
              {t}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Search by order ID or customer name…"
        className="w-full bg-white border border-gray-200 shadow-sm rounded-xl py-[11px] px-[18px] text-gray-800 text-sm outline-none mb-5 box-border focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200"
      />

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        {loading && !orders.length ? (
          <p className="text-gray-400 text-center p-12 m-0">Loading orders…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center p-12 m-0">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="border-b border-gray-200 bg-gray-50">
                {['Order ID', 'Customer', 'Date', 'Items', 'Amount', 'Status', 'Actions'].map(h => <th key={h} className="py-[14px] px-4 text-left text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map((order, i) => {
                  const sc = statusStyle(order.orderStatus);
                  return (
                    <tr key={order._id} className={`transition-colors duration-150 hover:bg-gray-50 ${i < filtered.length - 1 ? 'border-b border-gray-100' : 'border-none'}`}>
                      <td className="py-[13px] px-4 font-mono text-[#718b13] text-[13px]">#{order._id?.slice(-8)}</td>
                      <td className="py-[13px] px-4 text-gray-600 text-[13px]">{order.user?.name || '—'}</td>
                      <td className="py-[13px] px-4 text-gray-500 text-[13px]">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="py-[13px] px-4 text-gray-600 text-[13px]">{order.orderItems?.length}</td>
                      <td className="py-[13px] px-4 font-bold text-gray-800 text-[13px]">₹{order.totalPrice?.toLocaleString('en-IN')}</td>
                      <td className="py-[13px] px-4 text-[13px]">
                        <span className={`border rounded-full py-[3px] px-3 text-xs font-semibold ${sc.bg} ${sc.color} ${sc.border}`}>{order.orderStatus}</span>
                      </td>
                      <td className="py-[13px] px-4 text-[13px]">
                        <div className="flex gap-2">
                          <button onClick={() => setEditOrder(order)} className="bg-blue-50 text-blue-600 border border-blue-200 rounded-[10px] px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-100">Status</button>
                          <button onClick={() => setDeleteId(order._id)} className="bg-red-50 text-red-600 border border-red-200 rounded-[10px] px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Modal */}
      {editOrder && (
        <StatusModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onSave={(id, status) => dispatch(adminUpdateOrderStatus({ id, status }))}
          loading={loading}
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 shadow-lg rounded-[20px] p-8 max-w-[380px] w-full text-center">
            <div className="text-[40px] mb-3">🗑️</div>
            <h3 className="text-gray-800 font-bold m-0 mb-2 text-xl">Delete Order?</h3>
            <p className="text-gray-500 text-sm m-0 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 px-4 rounded-[10px] bg-white text-gray-600 border border-gray-200 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50">Cancel</button>
              <button onClick={() => dispatch(adminDeleteOrder(deleteId))} disabled={loading} className={`flex-1 py-2.5 px-4 rounded-[10px] bg-red-50 text-red-600 border border-red-200 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100 ${loading ? 'opacity-60' : 'opacity-100'}`}>
                {loading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
