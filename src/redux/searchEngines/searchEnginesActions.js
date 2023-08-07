import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl} from '../../repository/Repository';

export const getSearchEngines = createAsyncThunk('SEARCH_ENGINES/getSearchEngines', async () => {
    return await Repository.get(`${apiUrl}/search_engine/read`);
});

export const createSearchEngine = createAsyncThunk('SEARCH_ENGINES/createSearchEngine', async (data) => {
    return await Repository.post(`${apiUrl}/search_engine/create`, data);
});

export const updateSearchEngine = createAsyncThunk('SEARCH_ENGINES/updateSearchEngine', async (data) => {
    return await Repository.put(`${apiUrl}/search_engine/update`, data);
});