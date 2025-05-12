import { createAsyncThunk } from '@reduxjs/toolkit';
import ServerAPI from '../API/ServerAPI';

export const createPrayerRequest = createAsyncThunk(
	'prayerRequest/create',
	async (prayerRequestData, { rejectWithValue, getState }) => {
		const { user } = getState();
		const token = user.token;

		try {
			const response = await ServerAPI.post(
				'/prayer-requests',
				prayerRequestData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getPrayerRequests = createAsyncThunk(
	'prayerRequest/get',
	async (_, { rejectWithValue }) => {
		try {
			const response = await ServerAPI.get('/prayer-requests');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
