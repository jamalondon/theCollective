import { createSlice } from '@reduxjs/toolkit';
import { createPrayerRequest, getPrayerRequests } from './prayerRequestThunk';

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
			//console.log('action.payload', action.payload.prayerRequest);
			state.prayerRequests.push(action.payload);
		});
		builder.addCase(createPrayerRequest.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			console.log('error', action.payload);
		});
		builder.addCase(createPrayerRequest.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getPrayerRequests.fulfilled, (state, action) => {
			state.prayerRequests = action.payload.prayerRequests;
		});
		builder.addCase(getPrayerRequests.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(getPrayerRequests.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
	},
});

export const { setPrayerRequests } = prayerRequestSlice.actions;

export default prayerRequestSlice.reducer;
