// src/store/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
	name: 'events',
	initialState: {
		allEvents: [], // All available events
		myEvents: [], // Events created by the current user
		attendingEvents: [], // Events the current user is attending
		featuredEvents: [], // Events to highlight on the home page
		selectedEvent: null, // Currently selected event for detailed view
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
		// Set all events (from API)
		setAllEvents: (state, action) => {
			state.allEvents = action.payload;
		},

		// Set events created by user
		setMyEvents: (state, action) => {
			state.myEvents = action.payload;
		},

		// Set events user is attending
		setAttendingEvents: (state, action) => {
			state.attendingEvents = action.payload;
		},

		// Set featured events for home page
		setFeaturedEvents: (state, action) => {
			state.featuredEvents = action.payload;
		},

		// Select a specific event for detailed view
		selectEvent: (state, action) => {
			state.selectedEvent = action.payload;
		},

		// Clear selected event
		clearSelectedEvent: (state) => {
			state.selectedEvent = null;
		},

		// Create a new event (by current user)
		createEvent: (state, action) => {
			const newEvent = {
				...action.payload,
				creatorId: action.payload.creatorId, // Make sure creator ID is included
				attendees: [action.payload.creatorId], // Creator automatically attends
				createdAt: new Date().toISOString(),
			};

			// Add to both all events and my events
			state.allEvents.push(newEvent);
			state.myEvents.push(newEvent);
		},

		// Update an existing event
		updateEvent: (state, action) => {
			const updatedEvent = action.payload;

			// Update in allEvents
			const allIndex = state.allEvents.findIndex(
				(event) => event.id === updatedEvent.id
			);
			if (allIndex !== -1) {
				state.allEvents[allIndex] = updatedEvent;
			}

			// Update in myEvents if present
			const myIndex = state.myEvents.findIndex(
				(event) => event.id === updatedEvent.id
			);
			if (myIndex !== -1) {
				state.myEvents[myIndex] = updatedEvent;
			}

			// Update in attendingEvents if present
			const attendingIndex = state.attendingEvents.findIndex(
				(event) => event.id === updatedEvent.id
			);
			if (attendingIndex !== -1) {
				state.attendingEvents[attendingIndex] = updatedEvent;
			}

			// Update in featuredEvents if present
			const featuredIndex = state.featuredEvents.findIndex(
				(event) => event.id === updatedEvent.id
			);
			if (featuredIndex !== -1) {
				state.featuredEvents[featuredIndex] = updatedEvent;
			}

			// Update selected event if this is the one selected
			if (state.selectedEvent && state.selectedEvent.id === updatedEvent.id) {
				state.selectedEvent = updatedEvent;
			}
		},

		// Delete an event
		deleteEvent: (state, action) => {
			const eventId = action.payload;

			// Remove from all event arrays
			state.allEvents = state.allEvents.filter((event) => event.id !== eventId);
			state.myEvents = state.myEvents.filter((event) => event.id !== eventId);
			state.attendingEvents = state.attendingEvents.filter(
				(event) => event.id !== eventId
			);
			state.featuredEvents = state.featuredEvents.filter(
				(event) => event.id !== eventId
			);

			// Clear selected event if this was the one selected
			if (state.selectedEvent && state.selectedEvent.id === eventId) {
				state.selectedEvent = null;
			}
		},

		// User joins an event (current user is attending)
		joinEvent: (state, action) => {
			const { eventId, userId } = action.payload;

			// Find the event in allEvents
			const event = state.allEvents.find((e) => e.id === eventId);
			if (event) {
				// Initialize attendees array if needed
				if (!event.attendees) {
					event.attendees = [];
				}

				// Add user if not already in attendees
				if (!event.attendees.includes(userId)) {
					event.attendees.push(userId);
				}

				// Add to user's attending events if not already there
				const isAlreadyAttending = state.attendingEvents.some(
					(e) => e.id === eventId
				);
				if (!isAlreadyAttending) {
					state.attendingEvents.push(event);
				}
			}
		},

		// User leaves an event (current user stops attending)
		leaveEvent: (state, action) => {
			const { eventId, userId } = action.payload;

			// Find and update the event in allEvents
			const event = state.allEvents.find((e) => e.id === eventId);
			if (event && event.attendees) {
				event.attendees = event.attendees.filter((id) => id !== userId);
			}

			// Remove from user's attending events
			state.attendingEvents = state.attendingEvents.filter(
				(e) => e.id !== eventId
			);
		},

		// Toggle loading state
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},

		// Set error message
		setError: (state, action) => {
			state.error = action.payload;
		},

		// Update filters
		updateFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload };
		},

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
	},
});

// Export actions
export const {
	setAllEvents,
	setMyEvents,
	setAttendingEvents,
	setFeaturedEvents,
	selectEvent,
	clearSelectedEvent,
	createEvent,
	updateEvent,
	deleteEvent,
	joinEvent,
	leaveEvent,
	setLoading,
	setError,
	updateFilters,
	resetFilters,
} = eventsSlice.actions;

// Export reducer
export default eventsSlice.reducer;
