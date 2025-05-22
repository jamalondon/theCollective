// src/store/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
	getAllEvents,
	getMyEvents,
	getAttendingEvents,
	createEvent,
	updateEvent,
	deleteEvent,
	attendEvent,
	cancelAttendance,
	searchUsers,
	searchLocations,
} from './eventThunk';

const eventsSlice = createSlice({
	name: 'events',
	initialState: {
		allEvents: [], // All available events
		myEvents: [], // Events created by the current user
		attendingEvents: [], // Events the current user is attending
		featuredEvents: [], // Events to highlight on the home page
		selectedEvent: null, // Currently selected event for detailed view
		searchResults: [], // Results from user or location search
		isLoading: false,
		error: null,
		filters: {
			category: 'all',
			dateRange: {
				start: null,
				end: null,
			},
			searchTerm: '',
			sortBy: 'date',
		},
	},
	reducers: {
		// Reset filters to default
		resetFilters: (state) => {
			state.filters = {
				category: 'all',
				dateRange: {
					start: null,
					end: null,
				},
				searchTerm: '',
				sortBy: 'date',
			};
		},
		//clear search results
		clearSearchResults: (state) => {
			state.searchResults = [];
		},
		// Select a specific event for detailed view
		selectEvent: (state, action) => {
			state.selectedEvent = action.payload;
		},
		// Clear selected event
		clearSelectedEvent: (state) => {
			state.selectedEvent = null;
		},
	},
	extraReducers: (builder) => {
		// Get All Events
		builder.addCase(getAllEvents.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getAllEvents.fulfilled, (state, action) => {
			state.isLoading = false;
			state.allEvents = action.payload;
			state.error = null;
		});
		builder.addCase(getAllEvents.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		// Get My Events
		builder.addCase(getMyEvents.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getMyEvents.fulfilled, (state, action) => {
			state.isLoading = false;
			state.myEvents = action.payload;
			state.error = null;
		});
		builder.addCase(getMyEvents.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		// Get Attending Events
		builder.addCase(getAttendingEvents.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getAttendingEvents.fulfilled, (state, action) => {
			state.isLoading = false;
			state.attendingEvents = action.payload;
			state.error = null;
		});
		builder.addCase(getAttendingEvents.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		// Create Event
		builder.addCase(createEvent.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(createEvent.fulfilled, (state, action) => {
			state.isLoading = false;
			state.allEvents.push(action.payload);
			state.myEvents.push(action.payload);
			state.error = null;
		});
		builder.addCase(createEvent.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		// Update Event
		builder.addCase(updateEvent.fulfilled, (state, action) => {
			const updatedEvent = action.payload;
			state.allEvents = state.allEvents.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			);
			state.myEvents = state.myEvents.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			);
			state.attendingEvents = state.attendingEvents.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			);
			if (state.selectedEvent?.id === updatedEvent.id) {
				state.selectedEvent = updatedEvent;
			}
		});

		// Delete Event
		builder.addCase(deleteEvent.fulfilled, (state, action) => {
			const deletedEventId = action.payload;
			state.allEvents = state.allEvents.filter(
				(event) => event.id !== deletedEventId
			);
			state.myEvents = state.myEvents.filter(
				(event) => event.id !== deletedEventId
			);
			state.attendingEvents = state.attendingEvents.filter(
				(event) => event.id !== deletedEventId
			);
			if (state.selectedEvent?.id === deletedEventId) {
				state.selectedEvent = null;
			}
		});

		// Attend Event
		builder.addCase(attendEvent.fulfilled, (state, action) => {
			const updatedEvent = action.payload;
			state.allEvents = state.allEvents.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			);
			if (
				!state.attendingEvents.find((event) => event.id === updatedEvent.id)
			) {
				state.attendingEvents.push(updatedEvent);
			}
		});

		// Cancel Attendance
		builder.addCase(cancelAttendance.fulfilled, (state, action) => {
			const updatedEvent = action.payload;
			state.allEvents = state.allEvents.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			);
			state.attendingEvents = state.attendingEvents.filter(
				(event) => event.id !== updatedEvent.id
			);
		});

		// Search Users
		builder.addCase(searchUsers.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(searchUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.searchResults = action.payload;
			state.error = null;
		});
		builder.addCase(searchUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.searchResults = [];
		});

		// Search Locations
		builder.addCase(searchLocations.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(searchLocations.fulfilled, (state, action) => {
			state.isLoading = false;
			state.searchResults = action.payload;
			state.error = null;
		});
		builder.addCase(searchLocations.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.searchResults = [];
		});
	},
});

// Export actions
export const {
	resetFilters,
	selectEvent,
	clearSelectedEvent,
	clearSearchResults,
} = eventsSlice.actions;

// Export reducer
export default eventsSlice.reducer;
