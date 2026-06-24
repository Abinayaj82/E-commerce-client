import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminGetAllUsers,
  adminUpdateUserRole,
  adminDeleteUser,
  clearAdminError,
  clearAdminSuccess,
} from '../../features/Admin/AdminSlice';

/* ─── Role Modal ─────────────────────────────────────────────── */
const RoleModal = ({ user, onClose, onSave, loading }) => {
  const [role, setRole] = useState(user.role || 'user');
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-lg w-full max-w-[380px] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#718b13] font-extrabold text-lg m-0">Update Role</h2>
          <button onClick={onClose} className="bg-transparent border-none text-gray-400 hover:text-gray-600 cursor-pointer text-[22px] leading-none">✕</button>
        </div>

        {/* User avatar + info */}
        <div className="flex items-center gap-3 mb-6 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl">
          {user.avatar?.url
            ? <img src={user.avatar.url} alt={user.name} className="w-11 h-11 rounded-full object-cover" />
            : <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#718b13] to-[#a3c41a] flex items-center justify-center text-white font-bold text-base">{user.name?.[0]?.toUpperCase()}</div>
          }
          <div>
            <p className="text-gray-800 font-semibold m-0">{user.name}</p>
            <p className="text-gray-500 text-xs mt-0.5 mb-0">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mb-6">
          {['user', 'admin'].map((r) => {
            const active = role === r;
            const isAdmin = r === 'admin';
            return (
              <button key={r} onClick={() => setRole(r)} className={`px-4 py-3 rounded-[10px] border text-sm text-left transition-all duration-200 flex items-center gap-2 ${active ? (isAdmin ? 'bg-[#718b13]/10 border-[#718b13]/30 text-[#718b13] font-bold' : 'bg-purple-50 border-purple-200 text-purple-600 font-bold') : 'bg-white border-gray-200 text-gray-500 font-normal hover:bg-gray-50'}`}>
                <span className="text-lg">{isAdmin ? '🛡️' : '👤'}</span>
                <span className="capitalize">{r}</span>
                {active && <span className="ml-auto text-xs">✓</span>}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 px-4 rounded-[10px] bg-white text-gray-600 border border-gray-200 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(user._id, role)} disabled={loading} className={`flex-1 py-2.5 px-4 rounded-[10px] bg-gradient-to-br from-[#718b13] to-[#a3c41a] text-white border border-transparent text-xs font-semibold cursor-pointer transition-all duration-200 hover:shadow-md ${loading ? 'opacity-60' : 'opacity-100'}`}>
            {loading ? 'Saving…' : 'Update Role'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── main ──────────────────────────────────────────────────── */
const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, userCount, loading, error, success } = useSelector(s => s.admin);
  const [roleModal, setRoleModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  useEffect(() => { dispatch(adminGetAllUsers()); }, [dispatch]);

  useEffect(() => {
    if (success) { setRoleModal(null); setDeleteId(null); dispatch(clearAdminSuccess()); dispatch(adminGetAllUsers()); }
    if (error) { const t = setTimeout(() => dispatch(clearAdminError()), 4000); return () => clearTimeout(t); }
  }, [success, error, dispatch]);

  const filtered = users
    .filter(u => filterRole === 'All' || u.role === filterRole)
    .filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  const adminsCount = users.filter(u => u.role === 'admin').length;
  const usersCount = users.filter(u => u.role === 'user').length;

  return (
    <div className="max-w-[1200px] mx-auto">
      {error && <div className="fixed top-6 right-6 z-[9999] px-[22px] py-[13px] rounded-xl bg-red-100 border border-red-200 text-red-600 font-semibold text-sm shadow-sm">⚠ {error}</div>}
      {success && <div className="fixed top-6 right-6 z-[9999] px-[22px] py-[13px] rounded-xl bg-green-100 border border-green-200 text-green-600 font-semibold text-sm shadow-sm">✓ User updated successfully!</div>}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-[#718b13] font-extrabold text-[26px] m-0">
          Users <span className="text-gray-400 text-base font-normal">({userCount})</span>
        </h1>
        <div className="flex gap-2.5">
          <div className="bg-[#718b13]/10 border border-[#718b13]/20 rounded-[10px] py-2 px-4 text-[#718b13] text-[13px] font-semibold">
            🛡️ Admins: {adminsCount}
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-[10px] py-2 px-4 text-purple-600 text-[13px] font-semibold">
            👤 Users: {usersCount}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['All', 'admin', 'user'].map((r) => {
          const active = filterRole === r;
          return (
            <button key={r} onClick={() => setFilterRole(r)} className={`py-[7px] px-[18px] rounded-full text-[13px] cursor-pointer capitalize border transition-all duration-200 ${active ? 'font-bold bg-[#718b13]/10 text-[#718b13] border-[#718b13]/20' : 'font-normal bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>
              {r}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Search by name or email…"
        className="w-full bg-white border border-gray-200 shadow-sm rounded-xl py-[11px] px-[18px] text-gray-800 text-sm outline-none mb-5 box-border focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200"
      />

      {/* Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        {loading && !users.length ? (
          <p className="text-gray-400 text-center p-12 m-0">Loading users…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center p-12 m-0">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="border-b border-gray-200 bg-gray-50">
                {['#', 'User', 'Email', 'Role', 'Joined', 'Actions'].map(h => <th key={h} className="py-[14px] px-4 text-left text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={user._id}
                    className={`transition-colors duration-150 hover:bg-gray-50 border-b border-gray-100 last:border-none`}
                  >
                    <td className="py-[13px] px-4 text-gray-400 text-[13px]">{i + 1}</td>
                    <td className="py-[13px] px-4 text-gray-800 text-[13px]">
                      <div className="flex items-center gap-2.5">
                        {user.avatar?.url
                          ? <img src={user.avatar.url} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                          : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#718b13] to-[#a3c41a] flex items-center justify-center text-white font-bold text-sm shrink-0">{user.name?.[0]?.toUpperCase()}</div>
                        }
                        <span className="font-semibold text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-[13px] px-4 text-gray-500 text-[13px]">{user.email}</td>
                    <td className="py-[13px] px-4 text-gray-800 text-[13px]">
                      <span className={`border rounded-full py-[3px] px-3 text-xs font-semibold capitalize ${user.role === 'admin' ? 'bg-[#718b13]/10 text-[#718b13] border-[#718b13]/20' : 'bg-purple-50 text-purple-600 border-purple-200'}`}>{user.role}</span>
                    </td>
                    <td className="py-[13px] px-4 text-gray-400 text-[13px]">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                    <td className="py-[13px] px-4 text-gray-800 text-[13px]">
                      <div className="flex gap-2">
                        <button onClick={() => setRoleModal(user)} className="bg-blue-50 text-blue-600 border border-blue-200 rounded-[10px] px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-100">Role</button>
                        <button onClick={() => setDeleteId(user._id)} className="bg-red-50 text-red-600 border border-red-200 rounded-[10px] px-4 py-2 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Modal */}
      {roleModal && (
        <RoleModal
          user={roleModal}
          onClose={() => setRoleModal(null)}
          onSave={(id, role) => dispatch(adminUpdateUserRole({ id, role }))}
          loading={loading}
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-[20px] shadow-lg p-8 max-w-[380px] w-full text-center">
            <div className="text-[40px] mb-3">⚠️</div>
            <h3 className="text-gray-800 font-bold m-0 mb-2 text-xl">Delete User?</h3>
            <p className="text-gray-500 text-sm m-0 mb-6">This action cannot be undone. All user data will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 px-4 rounded-[10px] bg-white text-gray-600 border border-gray-200 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50">Cancel</button>
              <button onClick={() => dispatch(adminDeleteUser(deleteId))} disabled={loading} className={`flex-1 py-2.5 px-4 rounded-[10px] bg-red-50 text-red-600 border border-red-200 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100 ${loading ? 'opacity-60' : 'opacity-100'}`}>
                {loading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
