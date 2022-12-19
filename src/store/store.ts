import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './features/auth/register';
import loginReducer from './features/auth/login';
import productsReducer from './features/products/products';

export const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch