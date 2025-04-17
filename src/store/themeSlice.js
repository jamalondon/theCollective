import { createSlice } from '@reduxjs/toolkit';
import {
	LIGHT_COLORS,
	DARK_COLORS,
	updateThemeColors,
} from '../constants/theme';

const initialState = {
	isDarkMode: false,
	colors: LIGHT_COLORS,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.isDarkMode = !state.isDarkMode;
			state.colors = state.isDarkMode ? DARK_COLORS : LIGHT_COLORS;
			// Update the global theme colors
			updateThemeColors(state.isDarkMode);
		},
		setTheme: (state, action) => {
			state.isDarkMode = action.payload;
			state.colors = action.payload ? DARK_COLORS : LIGHT_COLORS;
			// Update the global theme colors
			updateThemeColors(action.payload);
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Selector
export const selectTheme = (state) => state.theme;
