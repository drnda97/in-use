import { createAsyncThunk } from '@reduxjs/toolkit';
import Repository, {apiUrl} from '../../repository/Repository';
import {setCookies} from "../../plugins/token-data";

export const login = createAsyncThunk('AUTH/login', async (data) => {
    const response = await Repository.post(`${apiUrl}/user/login`, data);
    const { token, refresh_token } = response.data;
    setCookies(token, refresh_token);

    return response;
});

export const refreshToken = createAsyncThunk('AUTH/refreshToken', async (data) => {
    const response = await Repository.post(`${apiUrl}/user/reset-token`, data);
    if (response.status === 200) {
        setCookies(response.data?.token, response.data?.refresh_token);
    }
});
