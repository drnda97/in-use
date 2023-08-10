import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl, serializeQuery} from '../../repository/Repository';

export const getSearchJobs = createAsyncThunk('SEARCH_JOBS/getSearchJobs', async (data) => {
    return await Repository.get(`${apiUrl}/search_job/read${serializeQuery(data)}`);
});

export const getSearchJobsInProgress = createAsyncThunk('SEARCH_JOBS/getSearchJobsInProgress', async () => {
    return await Repository.get(`${apiUrl}/search_job/read/in-progress`);
});

export const createSearchJob = createAsyncThunk('SEARCH_JOBS/createSearchJob', async (data) => {
    return await Repository.post(`${apiUrl}/search_job/create`, data);
});

export const runJob = createAsyncThunk('SEARCH_JOBS/runJob', async (data) => {
    return await Repository.post(`${apiUrl}/search_job/run-job`, data);
});

export const updateSearchJob = createAsyncThunk('SEARCH_JOBS/updateSearchJob', async (data) => {
    return await Repository.put(`${apiUrl}/search_job/update`, data);
});

export const createSearchJobImage = createAsyncThunk('SEARCH_JOBS/updateSearchJob', async (data) => {
    return await Repository.post(`${apiUrl}/search_job/upload/new-image`, data);
});
