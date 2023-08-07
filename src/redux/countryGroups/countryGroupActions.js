import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl, serializeQuery} from '../../repository/Repository';

export const getCountryGroups = createAsyncThunk('COUNTRY_GROUPS/getCountryGroups', async () => {
    return await Repository.get(`${apiUrl}/country_group/read`);
});

export const getCountryGroup = createAsyncThunk('COUNTRY_GROUPS/getCountryGroup', async (data) => {
    return await Repository.get(`${apiUrl}/country_group/read-by-id${serializeQuery(data)}`);
});

export const createCountryGroup = createAsyncThunk('COUNTRY_GROUPS/createCountryGroup', async (data) => {
    return await Repository.post(`${apiUrl}/country_group/create`, data);
});

export const updateCountryGroup = createAsyncThunk('COUNTRY_GROUPS/updateCountryGroup', async (data) => {
    return await Repository.put(`${apiUrl}/country_group/update`, data);
});

export const deleteCountryGroup = createAsyncThunk('COUNTRY_GROUPS/deleteCountryGroup', async (data) => {
    return await Repository.delete(`${apiUrl}/country_group/delete`, data);
});
