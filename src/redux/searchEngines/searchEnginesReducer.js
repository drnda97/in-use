import { createSlice } from '@reduxjs/toolkit';
import {getSearchEngines} from "./searchEnginesActions";

const initialState = {
    searchEngines: [],
    status: true
};

export const searchEnginesReducer = createSlice({
    name: 'SEARCH JOBS',
    initialState,

    reducers: {
    },
    extraReducers: {
        [getSearchEngines.pending]: (state) => {
            state.status = true;
        },
        [getSearchEngines.fulfilled]: (state, { payload }) => {
            state.searchEngines = payload.data;
            state.status = false;
        },
        [getSearchEngines.rejected]: (state) => {
            state.status = false;
        },
    },
});

export const {} = searchEnginesReducer.actions;

export default searchEnginesReducer.reducer;
