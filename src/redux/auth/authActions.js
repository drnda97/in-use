import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl} from '../../repository/Repository';

export const login = createAsyncThunk('AUTH/login', async (data) => {
    return await Repository.post(`${apiUrl}/user/login`, data);
});
