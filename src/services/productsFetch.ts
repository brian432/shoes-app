import { createAsyncThunk } from "@reduxjs/toolkit";

type Result = {
    status_code: number,
    data?: [],
    error?: any
}

export const getProducts = createAsyncThunk('products/getProducts',
    async (_, thunkApi) => { //agregar primer parametro necesario para utilizar thunkApi
        try {
            const response: Response = await fetch('http://localhost:3001/api/products');
            const result: Result = await response.json();

            if (result.status_code === 200) return result.data;
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

//Get products for id

export const getProductsId = createAsyncThunk('products/getProductsId',
    async (id: string, thunkApi) => { //agregar primer parametro necesario para utilizar thunkApi
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`);
            const result = await response.json();

            if (result.status_code === 200) return result.data; //Para reutilizar el estado, 
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);