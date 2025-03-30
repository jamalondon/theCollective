// userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerAPI from '../API/ServerAPI';
import * as RootNavigation from '../navigation/navigationRef';

// Sign Up Thunk
export const signUpUser = createAsyncThunk(
	'user/signUp',
	async ({ email, password, name, dateOfBirth }, { rejectWithValue }) => {
		try {
			const response = await ServerAPI.post('/auth/signup', {
				email,
				password,
				name,
				dateOfBirth,
			});

			// Store token in AsyncStorage for persistence
			await AsyncStorage.setItem('token', response.data.token);

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
			console.error('Error:', error);
			return rejectWithValue(error.message || 'Network error');
		}
	}
);

// Sign In Thunk
export const signInUser = createAsyncThunk(
	'user/signIn',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await ServerAPI.post('/auth/signin', {
				email,
				password,
			});

			// Store token in AsyncStorage for persistence
			await AsyncStorage.setItem('token', response.data.token);

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
			return rejectWithValue(error.message || 'Network error');
		}
	}
);

// Try Auto Sign In from stored token
export const tryLocalSignIn = createAsyncThunk(
	'user/localSignIn',
	async (_, { rejectWithValue }) => {
		try {
			const token = await AsyncStorage.getItem('token');

			// Here you would typically validate the token with your backend
			// For now, we'll just return the token
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
