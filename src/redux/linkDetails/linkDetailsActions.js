import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl, serializeQuery} from '../../repository/Repository';

export const getLinkDetailsAdmin = createAsyncThunk('LINK_DETAILS/getLinkDetailsAdmin', async (data) => {
    return await Repository.get(`${apiUrl}/link_details/read/admin/by-search-job${serializeQuery(data)}`);
});

export const generateResults = createAsyncThunk('LINK_DETAILS/generateResults', async (data) => {
    return await Repository.post(`${apiUrl}/link_details/generate/results`, data);
});
