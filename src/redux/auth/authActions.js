import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository from '../../repository/Repository';

export const login = createAsyncThunk('AUTH/login', async (data) => {
    return await Repository.post(`http://aws-api.brandschecker.com:8080/user_management/api/v1/user/login`, data);
});
