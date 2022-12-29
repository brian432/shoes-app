import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateOrderCardTypes } from '../types/types';

export const createOrderCard = createAsyncThunk('order/createOrderCard',
    async ({ products, amount, address }: CreateOrderCardTypes, thunkApi) => {
        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                },
                body: JSON.stringify({
                    products,
                    amount,
                    address
                })
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data.id
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const getAllOrdersCards= createAsyncThunk('order/getAllOrdersCards',
    async (_, thunkApi) => {
        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                }
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);