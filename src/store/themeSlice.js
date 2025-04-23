import { createSlice } from '@reduxjs/toolkit';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/theme';
import { createSelector } from '@reduxjs/toolkit';

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
		},
		setTheme: (state, action) => {
			state.isDarkMode = action.payload;
			state.colors = action.payload ? DARK_COLORS : LIGHT_COLORS;
		},
	},
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Memoized selectors
const selectThemeState = (state) => state.theme;

export const selectTheme = createSelector([selectThemeState], (theme) => ({
	isDarkMode: theme.isDarkMode,
	colors: theme.colors,
}));
