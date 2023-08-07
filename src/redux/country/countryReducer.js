import { createSlice } from '@reduxjs/toolkit';
import { getCountries } from './countryActions';

const initialState = {
    countries: [],
    status: true,
};

export const countryReducer = createSlice({
    name: 'COUNTRY',
    initialState,

    reducers: {
        setCountries: (state, { payload }) => {
            return {
                ...state,
                ...{ countries: payload },
            };
        },
    },
    extraReducers: {
        [getCountries.pending]: (state) => {
            state.status = true;
        },
        [getCountries.fulfilled]: (state, { payload }) => {
            state.countries = payload.data;
            state.status = false;
        },
        [getCountries.rejected]: (state) => {
            state.status = false;
        },
    },
});

export const {} = countryReducer.actions;

export default countryReducer.reducer;
