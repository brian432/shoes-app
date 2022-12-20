import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../../types/types';

const initialState: CartState = {
    products: [],
    quantity: 0,
    total: 0
};

export const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1; //Cada vez que agregamos un producto al carrito, sumamos la cantidad
            state.products.push(action.payload); //Agregamos el productor con su colo y talle aditado
            state.total += action.payload.price * action.payload.quantity //sumamos el precio de los productos multiplicado por la cantidad de productos
        }
    }
});

export const {
    addProduct
} = CartSlice.actions;
export default CartSlice.reducer;