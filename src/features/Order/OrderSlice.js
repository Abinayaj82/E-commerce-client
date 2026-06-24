import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("order/create" , async (orderData,{rejectWithValue})=>{
    try{
        const config ={
            headers:{
                "Content-Type" :"application/json",
            },
            withCredentials:true,
        }
        const {data } = await axios.post("/api/v1/order/new", orderData, config);
        console.log(data);

        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || "Order creation failed");
    }
})
// get all orders of a user
export const getMyOrders = createAsyncThunk("order/myorders", async (_, { rejectWithValue }) => {
    try{
        const config = {
            withCredentials:true,
        }
        const { data } = await axios.get("/api/v1/orders/user", config);
        return data.orders;
    }catch(error){
        return rejectWithValue(error.response?.data || "Failed to fetch orders");

    }
})
// get single order details
export const getOrderDetails = createAsyncThunk("order/details", async (orderId, {rejectWithValue})=>{
    try{
        const config ={
            withCredentials:true,
        }
        const { data } = await axios.get(`/api/v1/order/${orderId}`, config);
        return data.order;
    }catch(error){
        return rejectWithValue(error.response?.data || "Failed to fetch order details");
    }
})


const orderSlice = createSlice({
    name:"order",
    initialState:{
        loading:false,
        order:null,
        orderError:null,
        orderSuccess:false,
        orders:[],
    },
    reducers:{
        removeOrderError:(state)=>{
            state.orderError =null;
        },
        removeOrderSuccess:(state)=>{
            state.orderSuccess = false
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending,(state)=>{
            state.loading = true;
            state.orderError = null;
        })
         .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
            state.orderSuccess = true;
        })
         .addCase(createOrder.rejected,(state,action)=>{
            state.loading = false;
            state.orderError = action.payload;
        })
        // get my orders
        .addCase(getMyOrders.pending,(state)=>{
            state.loading = true;
            state.orderError = null;
        })
        .addCase(getMyOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(getMyOrders.rejected,(state,action)=>{
            state.loading = false;
            state.orderError = action.payload;
        })
        // get single order details
        .addCase(getOrderDetails.pending,(state)=>{
            state.loading = true;
            state.orderError = null;
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.loading = false;
            state.orderError = action.payload;

        })
    }
});

export const {removeOrderError, removeOrderSuccess} = orderSlice.actions;
export default orderSlice.reducer;
    
            
        
    