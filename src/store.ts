import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './features/auth/registerSlice';
import loginReducer from './features/auth/loginSlice';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        products: productsReducer,
        cart:cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;