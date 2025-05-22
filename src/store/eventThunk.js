import { createAsyncThunk } from '@reduxjs/toolkit';
import ServerAPI from '../API/ServerAPI';
//import * as RootNavigation from '../navigation/navigationRef';

// Create a new event
export const createEvent = createAsyncThunk(
	'events/create',
	async (eventData, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.post('/events/create', eventData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to create event');
		}
	}
);

// Get all events
export const getAllEvents = createAsyncThunk(
	'events/getAll',
	async (_, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.get('/events', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to fetch events');
		}
	}
);

// Get events owned by current user
export const getMyEvents = createAsyncThunk(
	'events/getMine',
	async (_, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.get('/events/my-events', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to fetch your events'
			);
		}
	}
);

// Get events user is attending
export const getAttendingEvents = createAsyncThunk(
	'events/getAttending',
	async (_, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.get('/events/attending', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to fetch attending events'
			);
		}
	}
);

// Get specific event by ID
export const getEventById = createAsyncThunk(
	'events/getById',
	async (eventId, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.get(`/events/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to fetch event');
		}
	}
);

// Update an event
export const updateEvent = createAsyncThunk(
	'events/update',
	async ({ eventId, updateData }, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.put(
				`/events/${eventId}/update`,
				updateData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to update event');
		}
	}
);

// Attend an event
export const attendEvent = createAsyncThunk(
	'events/attend',
	async (eventId, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.post(`/events/${eventId}/attend`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to attend event');
		}
	}
);

// Cancel attendance
export const cancelAttendance = createAsyncThunk(
	'events/cancel',
	async (eventId, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.post(`/events/${eventId}/cancel`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to cancel attendance'
			);
		}
	}
);

// Delete an event
export const deleteEvent = createAsyncThunk(
	'events/delete',
	async (eventId, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.delete(`/events/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return eventId; // Return the ID for the reducer to remove from state
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to delete event');
		}
	}
);

// Search users
export const searchUsers = createAsyncThunk(
	'events/searchUsers',
	async (searchQuery, { rejectWithValue, getState }) => {
		console.log('searchQuery', searchQuery);
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.get(
				`/users/search?query=${encodeURIComponent(searchQuery)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to search users');
		}
	}
);

// Search locations
export const searchLocations = createAsyncThunk(
	'events/searchLocations',
	async (searchQuery, { rejectWithValue, getState }) => {
		try {
			const { user } = getState();
			const token = user.token;
			const response = await ServerAPI.get(
				`/locations/search?query=${encodeURIComponent(searchQuery)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to search locations'
			);
		}
	}
);
