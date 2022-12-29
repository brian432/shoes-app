import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartCards, createCartCard, updateCartCard, delCartCard, delAllCartCards } from '../../services/cartFetch';
import { CartState, ProductCart } from '../../types/types';

const initialState: CartState = {
    loading: false,
    cards: [],
    quantity: 0,
    total: 0,
    error: null
};

export const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createCartCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCartCard.fulfilled, (state, action: PayloadAction<any>) => {
                state.quantity += 1;
                state.loading = false;
                state.cards = state.cards.concat(action.payload); //Concatenamos el nuevo producto agregado al carrito, luego cuando actualicemos la pagina, se volvera a hacer la peticion y el producto estara ahi ya proveniente de la base de datos
            })
            .addCase(createCartCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartCards.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.cards = action.payload;
                state.quantity = state.cards.length;
                state.total = state.cards?.map(card => card.price).reduce((suma, actual) => suma + actual, 0); //Creamos un array con todos los precios de los productos, utilizamos reduce para sumarlos
            })
            .addCase(getCartCards.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartCard.fulfilled, (state, action: PayloadAction<any>) => {
                const updatedCartCards: ProductCart[] = state.cards.map(card => card.id !== action.payload.id ? card : action.payload); //hacemos un mapeo del estado actual de los productos, si el id del producto mapeado es diferente al id que viene en el payload, lo almacenamos en el nuevo array, si es igual, lo reemplazamos por el nuevo producto

                state.loading = false;
                state.cards = updatedCartCards;
                state.total = updatedCartCards.map(card => card.price).reduce((suma, actual) => suma + actual, 0); //Creamos un array con todos los precios de los productos, utilizamos reduce para sumarlos
            })
            .addCase(updateCartCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(delCartCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(delCartCard.fulfilled, (state, action: PayloadAction<any>) => {
                const updatedCartCards: ProductCart[] = state.cards.filter(card => card.id !== action.payload.id);
                state.loading = false;
                state.cards = updatedCartCards;
                state.quantity = state.cards.length;
                state.total = updatedCartCards.map(product => product.price).reduce((suma, actual) => suma + actual, 0);
            })
            .addCase(delCartCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(delAllCartCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(delAllCartCards.fulfilled, (state) => {
                state = initialState;
            })
            .addCase(delAllCartCards.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default CartSlice.reducer;