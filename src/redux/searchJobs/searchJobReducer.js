import { createSlice } from '@reduxjs/toolkit';
import {getSearchJobs} from "./searchJobActions";

const initialState = {
    finishedSearchJobs: [],
    status: true
};

export const searchJobReducer = createSlice({
    name: 'SEARCH JOBS',
    initialState,

    reducers: {
    },
    extraReducers: {
        [getSearchJobs.pending]: (state) => {
            state.status = true;
        },
        [getSearchJobs.fulfilled]: (state, { payload }) => {
            state.finishedSearchJobs = payload.data;
            state.status = false;
        },
        [getSearchJobs.rejected]: (state) => {
            state.status = false;
        },
    },
});

export const {} = searchJobReducer.actions;

export default searchJobReducer.reducer;
