import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("product/getProduct", async ({ keyword, page=1, category }, {rejectWithValue}) => {
    try {
      //  const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}` : `/api/v1/products?page=${page}&category=${encodeURIComponent(category)}`;
        let link = `/api/v1/products?page=${page}`;
        if(category){
            link += `&category=${encodeURIComponent(category)}`;
        }
        if(keyword){
            link += `&keyword=${encodeURIComponent(keyword)}`;
        }
        const {data}= await axios.get(link);
        //console.log(data);
        
        return data;
     
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
})
export const getProductDetail = createAsyncThunk("product/getProductDetail", async (_id, {rejectWithValue}) => {
    try {
        const link =`/api/v1/product/${_id}`;
        const {data}= await axios.get(link);
        
        //console.log(data);
        return data;
     
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
})
export const productReview = createAsyncThunk("/product/review", async(reviewData,{rejectWithValue})=>{
    try {
          const config ={
            headers:{
                "Content-Type" :"application/json",
            },
            withCredentials:true,
        }
        const { data} = await axios.put("/api/v1/reviews",reviewData, config);
        return data;
    } catch (error) {
          return rejectWithValue(error.response?.data || "Something went wrong");
    }
})
 
const initialState ={
    products: [],
    productCount:0,
    loading: false,
    error: null,
    product: null,
    resultsPerPage: 4,
    totalPages: 0,
     reviews: [],

    

}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        removeError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getProduct.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultsPerPage = action.payload.resultsPerPage;
            state.totalPages = action.payload.totalPages; 
        })
        .addCase(getProduct.rejected, (state, action)=>{
            state.loading = false;
            state.products = [];
            state.error = action.payload || "Failed to fetch products";
        })
     
        // Handling getProductDetail
        .addCase(getProductDetail.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getProductDetail.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.product = action.payload;
        })
        .addCase(getProductDetail.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to fetch product details";
        })

        // Product review
          .addCase(productReview.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(productReview.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.reviews = action.payload;
        })
        .addCase(productReview.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to fetch product details";
        })
        }
    
});

export const {removeError} = productSlice.actions;
export default productSlice.reducer;
