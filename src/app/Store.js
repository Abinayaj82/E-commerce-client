import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/Products/ProductSlice'
import userReducer from '../features/User/UserSlice'
import cartReducer from  '../features/Cart/CartSlice'
import paymentReducer from '../features/Payment/PaymentSlice'
import orderReducer from "../features/Order/OrderSlice"
import adminReducer from "../features/Admin/AdminSlice"


export const store = configureStore({
    reducer: {
        product: productReducer,
        user:userReducer,
        cart:cartReducer,
        payment:paymentReducer,
        order:orderReducer,
        admin:adminReducer,
    }
})