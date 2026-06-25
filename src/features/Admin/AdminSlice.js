import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ── Products ──────────────────────────────────────────────────────────────────
export const adminGetAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/v1/admin/products");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

export const adminCreateProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await api.post("/api/v1/admin/product/new", formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create product");
    }
  }
);

export const adminUpdateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await api.put(`/api/v1/admin/product/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update product");
    }
  }
);

export const adminDeleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/v1/admin/product/${id}`);
      return { ...data, id };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete product");
    }
  }
);

// ── Orders ────────────────────────────────────────────────────────────────────
export const adminGetAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/v1/admin/orders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const adminUpdateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/v1/admin/order/${id}`, { status });
      return { ...data, id, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order");
    }
  }
);

export const adminDeleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/v1/admin/order/${id}`);
      return { ...data, id };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

// ── Users ─────────────────────────────────────────────────────────────────────
export const adminGetAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/v1/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

export const adminUpdateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/v1/admin/user/${id}`, { role });
      return { ...data, id, role };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user role");
    }
  }
);

export const adminDeleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/v1/admin/user/${id}`);
      return { ...data, id };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    error: null,
    success: false,
    // products
    products: [],
    productCount: 0,
    // orders
    orders: [],
    totalAmount: 0,
    // users
    users: [],
    userCount: 0,
  },
  reducers: {
    clearAdminError: (state) => { state.error = null; },
    clearAdminSuccess: (state) => { state.success = false; },
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.payload || "Something went wrong";
    };

    builder
      // ─ Products
      .addCase(adminGetAllProducts.pending, pending)
      .addCase(adminGetAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.productCount = action.payload.productCount || action.payload.products?.length || 0;
      })
      .addCase(adminGetAllProducts.rejected, rejected)

      .addCase(adminCreateProduct.pending, pending)
      .addCase(adminCreateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.product) state.products.push(action.payload.product);
      })
      .addCase(adminCreateProduct.rejected, rejected)

      .addCase(adminUpdateProduct.pending, pending)
      .addCase(adminUpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminUpdateProduct.rejected, rejected)

      .addCase(adminDeleteProduct.pending, pending)
      .addCase(adminDeleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter((p) => p._id !== action.payload.id);
      })
      .addCase(adminDeleteProduct.rejected, rejected)

      // ─ Orders
      .addCase(adminGetAllOrders.pending, pending)
      .addCase(adminGetAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders || [];
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(adminGetAllOrders.rejected, rejected)

      .addCase(adminUpdateOrderStatus.pending, pending)
      .addCase(adminUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const idx = state.orders.findIndex((o) => o._id === action.payload.id);
        if (idx !== -1) state.orders[idx].orderStatus = action.payload.status;
      })
      .addCase(adminUpdateOrderStatus.rejected, rejected)

      .addCase(adminDeleteOrder.pending, pending)
      .addCase(adminDeleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = state.orders.filter((o) => o._id !== action.payload.id);
      })
      .addCase(adminDeleteOrder.rejected, rejected)

      // ─ Users
      .addCase(adminGetAllUsers.pending, pending)
      .addCase(adminGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
        state.userCount = action.payload.userCount || action.payload.users?.length || 0;
      })
      .addCase(adminGetAllUsers.rejected, rejected)

      .addCase(adminUpdateUserRole.pending, pending)
      .addCase(adminUpdateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminUpdateUserRole.rejected, rejected)

      .addCase(adminDeleteUser.pending, pending)
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter((u) => u._id !== action.payload.id);
      })
      .addCase(adminDeleteUser.rejected, rejected);
  },
});

export const { clearAdminError, clearAdminSuccess } = adminSlice.actions;
export default adminSlice.reducer;
