import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../Navigation/navigationRef';

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
	},
	reducers: {
		// Actions that modify state
		// Note: This looks like we're mutating state, but Redux Toolkit uses Immer under the hood
		// which converts these "mutations" into immutable updates
		signIn: (state, action) => {},
		signUp: (state) => {},
		signOut: (state) => {},
		localSignIn: (state) => {},
		clearError: (state) => {
			state.errorMessage = '';
		},
	},
});

// Export actions
export const { signIn, signUp, signOut, localSignIn, clearError } =
	userSlice.actions;

// Export reducer
export default userSlice.reducer;
