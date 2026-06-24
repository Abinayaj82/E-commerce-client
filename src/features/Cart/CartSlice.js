import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCartItems = createAsyncThunk("cart/addItems", async (productData ,{rejectWithValue})=>{
    try {
        const {data} = await axios.post("/api/v1/cart/add", productData)
       // console.log(data)

        return data
    } catch (error) {
         return rejectWithValue(error.response?.data || "Something went wrong");
    }
})
//get cart items
export const getCartItems = createAsyncThunk("cart/getItems", async (_, {rejectWithValue})=>{
    try {
        const {data} = await axios.get("/api/v1/cart/getItems")
       // console.log(data)

        return data
    } catch (error) {
         return rejectWithValue(error.response?.data || "Something went wrong");
    }
})
// update quantity
export const updateQuantity = createAsyncThunk("cart/updateQuantity", async ({productId,quantity}, {rejectWithValue})=>{
    try {
        const {data} = await axios.put("/api/v1/cart/update" , {productId, quantity})
       // console.log(data)

        return data
    } catch (error) {
         return rejectWithValue(error.response?.data || "Something went wrong");
    }
})

// remove cart items

export const removeCartItems = createAsyncThunk("cart/removeCartItems", async (productId, {rejectWithValue})=>{
    try {
        const {data} = await axios.delete(`/api/v1/cart/delete/${productId}`)
       // console.log(data)
       // console.log(productId)
        return data
    } catch (error) {
         return rejectWithValue(error.response?.data || "Something went wrong");
    }
})
//clear cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_,{rejectWithValue})=>{
    try{
        const {date} = await axios.delete("api/v1/cart/clear");
        return date;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
})

const initialState = {
    cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [],
    loading :false,
    error :null,
    success : false,




} 

const cartSlice = createSlice({
    name :"cart",
    initialState,
    reducers : {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },

    },
    extraReducers:(builder) =>{
        builder
          .addCase(addCartItems.pending,(state)=>{
               state.loading = true,
               state.error =null
          })
          .addCase(addCartItems.fulfilled,(state,action)=>{
             state.loading = false,
             state.error = null,
             state.success = true,
             state.cartItems = action.payload.cartItems,
             localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          })
          .addCase(addCartItems.rejected,(state,action)=>{
            state.loading = false,
             state.error = action.payload?.message || "Failed to add cart",
             state.success = false
          })

          // get cart items
           .addCase(getCartItems.pending,(state)=>{
               state.loading = true,
               state.error =null
          })
          .addCase(getCartItems.fulfilled,(state,action)=>{
             state.loading = false,
             state.error = null,
             state.cartItems = action.payload.cartItems,
              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          })
          .addCase(getCartItems.rejected,(state,action)=>{
            state.loading = false,
             state.error = action.payload?.message || "Failed to load cart",
             state.success = false
          })

          // update quantity
            .addCase(updateQuantity.pending,(state)=>{
               state.loading = true,
               state.error =null
          })
          .addCase(updateQuantity.fulfilled,(state,action)=>{
             state.loading = false,
             state.error = null,
             state.cartItems = action.payload.cartItems,
              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          })
          .addCase(updateQuantity.rejected,(state,action)=>{
            state.loading = false,
             state.error = action.payload?.message || "Failed to load cart",
             state.success = false
          })
          // remove cart items
             .addCase(removeCartItems.pending,(state)=>{
               state.loading = true,
               state.error =null
          })
          .addCase(removeCartItems.fulfilled,(state,action)=>{
             state.loading = false,
             state.error = null,
             state.cartItems = action.payload.cartItems,
              localStorage.removeItem("cartItems",JSON.stringify([])
   )
          })
          .addCase(removeCartItems.rejected,(state,action)=>{
            state.loading = false,
             state.error = action.payload?.message || "Failed to load cart",
             state.success = false
          })
          //clear cart
           .addCase(clearCart.pending,(state)=>{
               state.loading = true,
               state.error =null
          })
          .addCase(clearCart.fulfilled,(state,action)=>{
                state.loading = false,
                state.error = null,
                state.cartItems = action.payload.cartItems,
                localStorage.removeItem("cartItems",JSON.stringify([])
    )
          })
           .addCase(clearCart.rejected,(state,action)=>{
            state.loading = false,
             state.error = action.payload?.message || "Failed to load cart",
             state.success = false
          })


    }
})


export const { removeError, removeSuccess }  = cartSlice.actions
 export default cartSlice.reducer