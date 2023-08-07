import { createSlice } from '@reduxjs/toolkit';
import {getLinkDetailsAdmin} from "./linkDetailsActions";

const initialState = {
    linkDetails: [],
};

export const linkDetailsReducer = createSlice({
    name: 'LINK DETAILS',
    initialState,

    reducers: {
    },
    extraReducers: {
        [getLinkDetailsAdmin.pending]: (state) => {
            state.status = true;
        },
        [getLinkDetailsAdmin.fulfilled]: (state, { payload }) => {
            state.linkDetails = payload.data;
            state.status = false;
        },
        [getLinkDetailsAdmin.rejected]: (state) => {
            state.status = false;
        },
    },
});

export const {} = linkDetailsReducer.actions;

export default linkDetailsReducer.reducer;
