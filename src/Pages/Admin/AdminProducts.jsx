import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminGetAllProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  clearAdminError,
  clearAdminSuccess,
} from '../../features/Admin/AdminSlice';

/* ─── modal ─────────────────────────────────────────────────── */
const CATEGORIES = ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Others'];

const ProductModal = ({ initial, onClose, onSave, loading }) => {
  const editing = !!initial;
  const [form, setForm] = useState({
    name: initial?.name || '',
    price: initial?.price || '',
    description: initial?.description || '',
    category: initial?.category || CATEGORIES[0],
    stock: initial?.stock || '',
    image: null,
  });
    const [preview, setPreview] = useState(
    initial?.image?.url || ""
  );


  const change = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image" && files?.[0]) {
      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));

      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
     formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    if (form.image) {
      formData.append("image", form.image);
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 shadow-lg rounded-[20px] w-full max-w-[520px] p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#718b13] font-extrabold text-xl m-0">{editing ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="bg-transparent border-none text-gray-400 hover:text-gray-600 cursor-pointer text-[22px] leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Product Name *</label>
            <input  className="w-full bg-white border border-gray-200 rounded-[10px] py-2.5 px-3.5 text-gray-800 text-sm outline-none box-border focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200" name="name" value={form.name} onChange={change} placeholder="e.g. Fresh Tomatoes" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-600 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Price (₹) *</label>
              <input  className="w-full bg-white border border-gray-200 rounded-[10px] py-2.5 px-3.5 text-gray-800 text-sm outline-none box-border focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200" name="price" type="number" min="0" value={form.price} onChange={change} placeholder="0.00" required />
            </div>
            <div>
              <label className="text-gray-600 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Stock *</label>
              <input className="w-full bg-white border border-gray-200 rounded-[10px] py-2.5 px-3.5 text-gray-800 text-sm outline-none box-border focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200" name="stock" type="number" min="0" value={form.stock} onChange={change} placeholder="0" required />
            </div>
          </div>
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Category</label>
            <select className="w-full bg-white border border-gray-200 rounded-[10px] py-2.5 px-3.5 text-gray-800 text-sm outline-none box-border appearance-none focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200" name="category" value={form.category} onChange={change}>
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-white">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Description *</label>
            <textarea  className="w-full bg-white border border-gray-200 rounded-[10px] py-2.5 px-3.5 text-gray-800 text-sm outline-none box-border min-h-[80px] resize-y focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200" name="description" value={form.description} onChange={change} placeholder="Product description…" required />
          </div>
          <div>
            <label className="text-gray-600 text-xs font-semibold mb-1.5 block uppercase tracking-wide">Product Image {editing ? '(leave empty to keep current)' : '*'}</label>
            <input className="w-full bg-white border border-gray-200 rounded-[10px] py-2 px-3.5 text-gray-800 text-sm outline-none box-border" type="file" name="image" accept="image/*" onChange={change} required={!editing} />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-[9px] px-[18px] rounded-[10px] bg-white text-gray-600 border border-gray-200 text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className={`flex-1 py-[9px] px-[18px] rounded-[10px] bg-gradient-to-br from-[#718b13] to-[#a3c41a] text-white border border-transparent text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md ${loading ? 'opacity-60' : 'opacity-100'}`}>
              {loading ? 'Saving…' : editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─── main ──────────────────────────────────────────────────── */
const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector(s => s.admin);
  const [modal, setModal] = useState(null); // null | 'create' | product-obj
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(adminGetAllProducts()); }, [dispatch]);

  useEffect(() => {
    if (success) { setModal(null); setDeleteId(null); dispatch(clearAdminSuccess()); dispatch(adminGetAllProducts()); }
    if (error) { const t = setTimeout(() => dispatch(clearAdminError()), 4000); return () => clearTimeout(t); }
  }, [success, error, dispatch]);

  const handleSave = (fd) => {
    if (modal === 'create') dispatch(adminCreateProduct(fd));
    else dispatch(adminUpdateProduct({ id: modal._id, formData: fd }));
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Toasts */}
      {error && <div className="fixed top-6 right-6 z-[9999] px-[22px] py-[13px] rounded-xl bg-red-100 border border-red-200 text-red-600 font-semibold text-sm shadow-sm">⚠ {error}</div>}
      {success && <div className="fixed top-6 right-6 z-[9999] px-[22px] py-[13px] rounded-xl bg-green-100 border border-green-200 text-green-600 font-semibold text-sm shadow-sm">✓ Operation successful!</div>}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#718b13] font-extrabold text-[26px] m-0">Products <span className="text-gray-400 text-base font-normal">({products.length})</span></h1>
        <button className="bg-gradient-to-br from-[#718b13] to-[#a3c41a] text-white border border-transparent rounded-[10px] py-[9px] px-[18px] text-[13px] font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5" onClick={() => setModal('create')}>
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Search products…"
        className="w-full bg-white border border-gray-200 shadow-sm rounded-xl py-[11px] px-[18px] text-gray-800 text-sm outline-none mb-5 box-border focus:border-[#718b13]/40 focus:ring-1 focus:ring-[#718b13]/40 transition-all duration-200"
      />

      {/* Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        {loading && !products.length ? (
          <p className="text-gray-400 text-center p-12 m-0">Loading products…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center p-12 m-0">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="border-b border-gray-200 bg-gray-50">
                {['#', 'Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => <th key={h} className="py-[14px] px-4 text-left text-gray-500 font-semibold text-xs uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p._id} className="transition-colors duration-150 hover:bg-gray-50 border-b border-gray-100 last:border-none">
                    <td className="py-[13px] px-4 text-gray-400 text-[13px]">{i + 1}</td>
                    <td className="py-[13px] px-4 text-gray-800 text-[13px]">
                      {p.image?.url
                        ? <img src={p.image.url} alt={p.name} className="w-[42px] h-[42px] rounded-lg object-cover border border-gray-100" />
                        : <div className="w-[42px] h-[42px] rounded-lg bg-[#718b13]/10 flex items-center justify-center text-[#718b13] text-lg">🥦</div>
                      }
                    </td>
                    <td className="py-[13px] px-4 text-gray-800 text-[13px] font-semibold max-w-[180px]"><span className="line-clamp-2">{p.name}</span></td>
                    <td className="py-[13px] px-4 text-gray-500 text-[13px]">{p.category}</td>
                    <td className="py-[13px] px-4 text-[#718b13] text-[13px] font-bold">₹{p.price?.toLocaleString('en-IN')}</td>
                    <td className="py-[13px] px-4 text-[13px]">
                      <span className={`rounded-full py-[2px] px-2.5 text-xs font-semibold ${p.stock > 0 ? 'text-green-600 bg-green-100 border border-green-200' : 'text-red-600 bg-red-100 border border-red-200'}`}>
                        {p.stock > 0 ? p.stock : 'Out'}
                      </span>
                    </td>
                    <td className="py-[13px] px-4 text-[13px]">
                      <div className="flex gap-2">
                        <button onClick={() => setModal(p)} className="bg-blue-50 text-blue-600 border border-blue-200 rounded-[10px] py-2 px-4 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-100">Edit</button>
                        <button onClick={() => setDeleteId(p._id)} className="bg-red-50 text-red-600 border border-red-200 rounded-[10px] py-2 px-4 text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modal && <ProductModal initial={modal === 'create' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} loading={loading} />}

      {/* Confirm Delete */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 shadow-lg rounded-[20px] p-8 max-w-[380px] w-full text-center">
            <div className="text-[40px] mb-3">🗑️</div>
            <h3 className="text-gray-800 font-bold m-0 mb-2 text-xl">Delete Product?</h3>
            <p className="text-gray-500 text-sm m-0 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-[9px] px-[18px] rounded-[10px] bg-white text-gray-600 border border-gray-200 text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50">Cancel</button>
              <button onClick={() => dispatch(adminDeleteProduct(deleteId))} disabled={loading} className={`flex-1 py-[9px] px-[18px] rounded-[10px] bg-red-50 text-red-600 border border-red-200 text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100 ${loading ? 'opacity-60' : 'opacity-100'}`}>
                {loading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
