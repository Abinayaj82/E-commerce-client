import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const paymentProcess = createAsyncThunk("payment/process", async (amount, {rejectWithValue}) => {
    try {
        const config ={
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const {data} = await axios.post("/api/v1/payment/process", {amount}, config)
        return data;
        console.log(data);
    } catch (error) {
        return rejectWithValue(error.response?.data || "Payment Failed");
        
    }
})
// verify payment
export const paymentVerify = createAsyncThunk("payment/verify", async (paymentData, {rejectWithValue})=>{
       try {
        const config ={
            headers:{
                "Content-Type" : "application/json",
            },
            withCredentials:true,
        }
        const {data} = await axios.post("/api/v1/payment/verify", paymentData, config);
        return data;
    }catch (error){
      return rejectWithValue(error.response?.data || "Payment verification failed")
    }            
})

const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        loading:false,
        order:null,
        error:null,
        success:false,
        verifySuccess: false,
    },
    reducers:{
        removePaymentError:(state)=>{
            state.error = null;
        },
        removePaymentSuccess:(state) =>{
            state.success = false;
        },
        removeVerifySuccess:(state) =>{
            state.verifySuccess = false;
        }
    },

    extraReducers:(builder)=>{
        builder
          .addCase(paymentProcess.pending,(state) => {
                state.loading = true;
            }
         )
          .addCase(paymentProcess.fulfilled,(state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload.order;
            }
         )
         .addCase(paymentProcess.rejected,(state, action) => {
               state.loading = false;
               state.error = action.payload;
            }
         )
         //verify payment
         .addCase(paymentVerify.pending,(state) =>{
            state.loading = true;
            state.error = null;
         })
         .addCase(paymentVerify.fulfilled,(state, action) =>{
            state.loading = false;
            state.verifySuccess = action.payload.success;
            state.order = action.payload.order;
            state.error = null;

         })
         .addCase(paymentVerify.rejected,(state,action) =>{
            state.loading = false;
            state.verifySuccess = false;
            state.error = action.payload;
         })

    }

    
})

export const {removePaymentError, removePaymentSuccess, removeVerifySuccess} = paymentSlice.actions;
export default paymentSlice.reducer;