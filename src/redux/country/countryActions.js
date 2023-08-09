import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl, serializeQuery} from '../../repository/Repository';

export const getCountries = createAsyncThunk('COUNTRY/getCountries', async () => {
    return await Repository.get(`${apiUrl}/country/read`);
});

export const getCountry = createAsyncThunk('COUNTRY/getCountry', async (data) => {
    return await Repository.get(`${apiUrl}/country/read-by-id${serializeQuery(data)}`);
});

export const createCountry = createAsyncThunk('COUNTRY/createCountry', async (data) => {
    return await Repository.post(`${apiUrl}/country/create`, data);
});

export const updateCountry = createAsyncThunk('COUNTRY/updateCountry', async (data) => {
    return await Repository.put(`${apiUrl}/country/update`, data);
});

export const deleteCountry = createAsyncThunk('COUNTRY/deleteCountry', async (data) => {
    return await Repository.delete(`${apiUrl}/country/delete?id=${data.id}`, {
        data: {
            id: data.id
        }
    });
});

export const updateSearchEngines = createAsyncThunk('COUNTRY/updateSearchEngines', async (data) => {
    return await Repository.put(`${apiUrl}/country/update-search-engines`, data);
});

export const updateCountryGroups = createAsyncThunk('COUNTRY/updateCountryGroups', async (data) => {
    return await Repository.put(`${apiUrl}/country/update-groups`, data);
});
