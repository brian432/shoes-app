import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postLogin } from '../../services/authFetch';
import { LoginState } from "../../types/types";

const initialState: LoginState = {
    loading: false,
    login: null,
    user: null,
    error: null
};

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        loginSwitch: (state) => {
            state = initialState;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postLogin.pending, (state) => {
                state.loading = true;   
                state.login = null;
            })
            .addCase(postLogin.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.login = true;
                state.user = action.payload;
                localStorage.setItem("tokenAuth", action.payload.token);
            })
            .addCase(postLogin.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.login = false;
                state.error = action.payload;
            })
    },
});
export const {
    loginSwitch
} = loginSlice.actions;
export default loginSlice.reducer;