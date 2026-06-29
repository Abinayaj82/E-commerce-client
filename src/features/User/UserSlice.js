import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const registerUser = createAsyncThunk("user/registerUser", async (formData, {rejectWithValue}) => {
    try {
        const config ={
            headers: {
                "Content-Type": "multipart/form-data"
            },
        };
        const {data} = await api.post("/api/v1/user/new", formData, config)
        return data;
        //console.log(data);
    } catch (error) {
        return rejectWithValue({
        message: error.response?.data?.message || "Registration failed",
        statusCode: error.response?.status,
      });
        
    }
})
//get user profile
export const getUserProfile = createAsyncThunk("user/getUserProfile", async (userId, {rejectWithValue}) => {
    try {
         
        const {data} = await api.get('/api/v1/user/profile')
        return data;
    } catch (error) {
        return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch user profile",
        statusCode: error.response?.status, // ✅ real HTTP status from axios
      });
    }
})

//Login user
export const loginUser = createAsyncThunk("user/loginUser", async ({email, password}, {rejectWithValue}) => {
    try {
         const config ={
            headers: {
                "Content-Type": "application/json"
            },
        };
        const {data} = await api.post("/api/v1/user/login", {email, password}, config)
          console.log("LOGIN RESPONSE:", data);
        return data;
    } catch (error) {
        console.log("LOGIN ERROR:", error.response);
        return rejectWithValue({
        message: error.response?.data?.message || "Invalid email or password",
        statusCode: error.response?.status,
      });
    }
})
//Logout user
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, {rejectWithValue}) => {
    try {
        await api.get("/api/v1/user/logout")
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
    } catch (error) {
        return rejectWithValue({
        message: error.response?.data?.message || "Logout failed",
        statusCode: error.response?.status,
      });
    }
})
// update user profile
export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (formData, {rejectWithValue}) => {
    try {
        const config ={
            headers: {
                "Content-Type": "multipart/form-data"
            },
        };
        const {data} = await api.put("/api/v1/user/update-profile", formData, config)
        return data;
    } catch (error) {
        return rejectWithValue({
        message: error.response?.data?.message || "Failed to update profile",
        statusCode: error.response?.status,
      });
    }
})

// update user password
export const updatePassword = createAsyncThunk("user/updatePassword", async (formData, {rejectWithValue}) => {
    try {
        const config ={
            headers: {
                "Content-Type": "multipart/form-data"
            },
        };
        const {data} = await api.put("/api/v1/user/update-password", formData, config)
        return data;
    } catch (error) {
        return rejectWithValue({
        message: error.response?.data?.message || "Failed to update password",
        statusCode: error.response?.status,
      });
    }
})

//forget password
   export const forgetPassword = createAsyncThunk("user/forgetPassword" , async({email}, {rejectWithValue}) =>{
     try {
        const config ={
            headers:{
                "Content-Type" : "application/json"
            },
        }
        const { data} = await api.post("/api/v1/user/forgot-password" ,{email}, config)
       // console.log(data)
        return data
     } catch (error) {
        return rejectWithValue({
        message: error.response?.data?.message || "Something went wrong",
        statusCode: error.response?.status,
      });
        
     }
   })
   //reset password
   export const resetPassword = createAsyncThunk("user/resetPassword", async({userData,token},{rejectWithValue})=>{
    try{
      const config ={
            headers:{
                "Content-Type" : "application/json"
            },
    }
       const { data } = await api.post(`/api/v1/user/reset-password/${token}`, userData ,config)
       console.log(data)
  } catch (error){
        return rejectWithValue({
        message: error.response?.data?.message || "Reset password failed",
        statusCode: error.response?.status,
      });
    }
   })
   //save address
   export const saveAddress = createAsyncThunk("user/saveAddress", async (addressData ,{rejectWithValue}) =>{
    try {
      const  config = {
            headers:{
                "Content-Type" :"application/json"
            }
        }
        const {data } = await api.post("api/v1/user/saveAddress", addressData , config)
        return data;
    } catch(error){
        return rejectWithValue({
        message: error.response?.data?.message || "Failed to save address",
        statusCode: error.response?.status,
      });
   }
    })



    
   

const initialState ={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("user") ? true : false,
    message: null,
    loginsuccess:false,
    logoutSuccess: false,
    updateSuccess: false,
    updatePasswordSuccess: false,
    forgetPasswordSuccess: false,
    resetPasswordSuccess:false,
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        },
        removeLoginSuccess: (state) => {
         state.loginSuccess = false;
   },
    
         removeLogoutSuccess: (state) => {
         state.logoutSuccess = false;
   },
         removeUpdateSuccess: (state) => {
            state.updateSuccess = false;
         },
         removeUpdatePasswordSuccess: (state) => {
            state.updatePasswordSuccess = false;
         },
         removeForgetPasswordSuccess:(state) =>{
            state.forgetPasswordSuccess = false;
         },
          removeResetPasswordSuccess:(state) =>{
            state.resetPasswordSuccess = false;
         },
        
    },
    extraReducers:(builder)=>{
    
        // Register user
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
                state.success = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user) ;
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Registration failed";
                state.isAuthenticated = false;
                state.user = null;

            })
            // Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
                state.loginSuccess = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user) ;
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
                state.isAuthenticated = false;
                state.user = null;
            })

            // Get user profile
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const token = state.user?.token || JSON.parse(localStorage.getItem("user"))?.token;
                state.user = { ...action.payload, token };
                state.success = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user) ;
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch user profile";
                // Only clear auth state on 401 Unauthorized — not on network/server errors
                if (action.payload?.statusCode === 401 || action.payload?.message === "Please login to access this resource") {
                    state.user = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem("user");
                    localStorage.removeItem("isAuthenticated");
                }
            })
            // Logout user
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.user = null;
                state.success = null;
                state.isAuthenticated = false;
                state.logoutSuccess = true;
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Logout failed";
                state.user = null;
                state.isAuthenticated = false;
                state.logoutSuccess = null;
                   
                
               
            })

        //update user profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const token = state.user?.token || JSON.parse(localStorage.getItem("user"))?.token;
                state.user = { ...action.payload, token };
                state.updateSuccess = true;
                state.isAuthenticated = Boolean(action.payload?.user) ;
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update profile";
                    if(action.payload?.statusCode === 401){
                        state.user = null;
                        state.isAuthenticated = false;
                        localStorage.removeItem("user");
                        localStorage.removeItem("isAuthenticated");
                        state.success = null;
                    }
              })


            //update password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
                state.updatePasswordSuccess = true;
                state.isAuthenticated = Boolean(action.payload?.user) ;
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update profile";
                    if(action.payload?.statusCode === 401){
                        state.user = null;
                        state.isAuthenticated = false;
                        localStorage.removeItem("user");
                        localStorage.removeItem("isAuthenticated");
                        state.updatePasswordSuccess = null;
                    }
              })

              // forget password
              .addCase(forgetPassword.pending, (state)=>{
                     state.loading = true,
                     state.error = null
              })
              .addCase(forgetPassword.fulfilled, (state,action)=>{
                    state.loading = false,
                    state.error = null,
                    state.forgetPasswordSuccess= action.payload.success
                    state.message = action.payload.message

                    
              })
              .addCase(forgetPassword.rejected, (state,action)=>{
                      state.loading =false,
                      state.error = action.payload?.message || "Something went wrong";
                      state.forgetPasswordSuccess= false

              })
              // reset password
               .addCase(resetPassword.pending, (state)=>{
                     state.loading = true,
                     state.error = null
              })
              .addCase(resetPassword.fulfilled, (state,action)=>{
                    state.loading = false,
                    state.error = null,
                    state.user = null,
                    state.resetPasswordSuccess = true,
                    state.isAuthenticated= false


                    
              })
              .addCase(resetPassword.rejected, (state,action)=>{
                      state.loading =false,
                      state.error = action.payload?.message || "Reset password failed";
                      state.resetPasswordSuccess= false

              })

              // save address
                .addCase(saveAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.shippingAddress = action.payload.shippingAddress;
                if (state.user && state.user.user) {
                    state.user.user.shippingAddress = action.payload.shippingAddress;
                    localStorage.setItem("user", JSON.stringify(state.user));
                }
                state.success = true;
                localStorage.setItem("shippingAddress", JSON.stringify(action.payload.shippingAddress));
            })
            .addCase(saveAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to save address";
               
               
                   
            })
        }
})


export const { removeError, removeSuccess,removeLoginSuccess, removeLogoutSuccess, 
    removeUpdateSuccess,removeUpdatePasswordSuccess ,
    removeForgetPasswordSuccess, removeResetPasswordSuccess} = userSlice.actions;
export default userSlice.reducer;