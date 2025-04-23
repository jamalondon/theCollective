import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../navigation/navigationRef';
import {
	signInUser,
	signUpUser,
	tryLocalSignIn,
	signOutUser,
} from './userThunks';

// Create a slice for user data
const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: '',
		email: '',
		token: '',
		userID: '',
		errorMessage: '',
		preferences: {
			darkMode: false,
			notifications: true,
		},
		dateOfBirth: '',
	},
	reducers: {
		// Actions that modify state
		// Note: This looks like we're mutating state, but Redux Toolkit uses Immer under the hood
		// which converts these "mutations" into immutable updates
		clearError: (state) => {
			state.errorMessage = '';
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Sign In cases
		builder.addCase(signInUser.pending, (state) => {
			state.errorMessage = '';
		});
		builder.addCase(signInUser.fulfilled, (state, action) => {
			state.errorMessage = '';
			state.token = action.payload.token;
			state.email = action.payload.email;
			state.userID = action.payload.userID || '';
			state.name = action.payload.name;
			state.dateOfBirth = action.payload.dateOfBirth || '';
			navigationRef.navigate('App');
		});
		builder.addCase(signInUser.rejected, (state, action) => {
			state.errorMessage = action.payload || 'Sign in failed';
		});

		// Sign Up cases
		builder.addCase(signUpUser.pending, (state) => {
			state.errorMessage = '';
		});
		builder.addCase(signUpUser.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.userID = action.payload.userID || '';
			state.errorMessage = '';
			navigationRef.navigate('App');
		});
		builder.addCase(signUpUser.rejected, (state, action) => {
			state.errorMessage = action.payload || 'Sign up failed';
		});

		// Local Sign In cases
		builder.addCase(tryLocalSignIn.pending, (state) => {});
		builder.addCase(tryLocalSignIn.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.userID = action.payload.userID || '';
			state.dateOfBirth = action.payload.dateOfBirth || '';
		});
		builder.addCase(tryLocalSignIn.rejected, (state) => {
			// We don't set an error message here as this is a background operation
		});

		// Sign Out cases
		builder.addCase(signOutUser.fulfilled, (state) => {
			state.name = '';
			state.email = '';
			state.token = '';
			state.userID = '';
			state.errorMessage = '';
		});
	},
});

// Export actions
export const { clearError, setErrorMessage } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
