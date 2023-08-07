import { createSlice } from '@reduxjs/toolkit';
import { login } from './authActions';

const initialState = {
    userToken: "",
    isLoggedIn: false,
    status: true,
};

export const authReducer = createSlice({
    name: 'COUNTRY',
    initialState,

    reducers: {
        setToken: (state, { payload }) => {
            return {
                ...state,
                ...{ userToken: payload },
            };
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.status = true;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.userToken = payload.data.token;
            state.status = false;
        },
        [login.rejected]: (state) => {
            state.status = false;
        },
    },
});

export const {setToken} = authReducer.actions;

export default authReducer.reducer;
