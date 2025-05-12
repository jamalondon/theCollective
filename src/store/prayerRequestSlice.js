import { createSlice } from '@reduxjs/toolkit';
import { createPrayerRequest } from './prayerRequestThunk';

const prayerRequestSlice = createSlice({
	name: 'prayerRequest',
	initialState: {
		prayerRequests: [],
		isLoading: false,
		error: null,
	},
	reducers: {
		setPrayerRequests: (state, action) => {
			state.prayerRequests = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createPrayerRequest.fulfilled, (state, action) => {
			state.prayerRequests.push(action.payload);
		});
		builder.addCase(createPrayerRequest.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(createPrayerRequest.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
	},
});

export const { setPrayerRequests } = prayerRequestSlice.actions;

export default prayerRequestSlice.reducer;
