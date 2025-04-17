// userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerAPI from '../API/ServerAPI';
import * as RootNavigation from '../navigation/navigationRef';
import { getAllEvents, getMyEvents, getAttendingEvents } from './eventThunk';

// Sign Up Thunk
export const signUpUser = createAsyncThunk(
	'user/signUp',
	async (
		{ email, password, name, dateOfBirth },
		{ rejectWithValue, dispatch }
	) => {
		try {
			// Validate input
			if (!email || !password || !name) {
				throw new Error('Email, password, and name are required');
			}
			const response = await ServerAPI.post('/auth/signup', {
				email,
				password,
				name,
				dateOfBirth,
			});
			console.log('email, password, name, dateOfBirth');

			// Validate response
			if (!response.data || !response.data.token) {
				throw new Error('Invalid server response - missing token');
			}

			// Store token in AsyncStorage for persistence
			await AsyncStorage.setItem('token', response.data.token);

			// Fetch initial event data
			await Promise.all([
				dispatch(getAllEvents()),
				dispatch(getMyEvents()),
				dispatch(getAttendingEvents()),
			]);

			// Navigate to the home screen
			RootNavigation.navigate('App');

			// Return user data to be stored in Redux
			return {
				token: response.data.token,
				email,
				name,
				userID: response.data.userID || '',
				dateOfBirth,
			};
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				return rejectWithValue(
					error.response.data?.message || 'Server error occurred'
				);
			} else if (error.request) {
				// The request was made but no response was received
				return rejectWithValue('No response from server');
			} else {
				// Something happened in setting up the request that triggered an Error
				return rejectWithValue(error.message);
			}
		}
	}
);

// Sign In Thunk
export const signInUser = createAsyncThunk(
	'user/signIn',
	async ({ email, password }, { rejectWithValue, dispatch }) => {
		try {
			const response = await ServerAPI.post('/auth/signin', {
				email,
				password,
			});

			if (!response.data || !response.data.token) {
				throw new Error('Invalid server response - missing token');
			}

			// Store token in AsyncStorage for persistence
			await AsyncStorage.setItem('token', response.data.token);

			// Fetch initial event data
			await Promise.all([
				dispatch(getAllEvents()),
				dispatch(getMyEvents()),
				dispatch(getAttendingEvents()),
			]);

			// Navigate to the home screen
			RootNavigation.navigate('App');

			// Return user data to be stored in Redux
			return {
				token: response.data.token,
				email,
				name: response.data.name || '',
				userID: response.data.userID || '',
				dateOfBirth: response.data.dateOfBirth || '',
			};
		} catch (error) {
			if (error.response) {
				return rejectWithValue(
					error.response.data?.message || 'Server error occurred'
				);
			} else if (error.request) {
				return rejectWithValue('No response from server');
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

// Try Auto Sign In from stored token
export const tryLocalSignIn = createAsyncThunk(
	'user/localSignIn',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const token = await AsyncStorage.getItem('token');

			if (!token) {
				return { token: null };
			}

			try {
				await dispatch(getAllEvents());
			} catch (error) {
				// Continue even if events fetch fails
			}

			return { token };
		} catch (error) {
			return rejectWithValue(error.message || 'Failed to restore session');
		}
	}
);

// Sign Out Thunk
export const signOutUser = createAsyncThunk(
	'user/signOut',
	async (_, { rejectWithValue }) => {
		try {
			await AsyncStorage.removeItem('token');
			return {};
		} catch (error) {
			return rejectWithValue(error.message || 'Failed to sign out');
		}
	}
);

// Additional thunks like tryLocalSignIn and signOutUser would go here
