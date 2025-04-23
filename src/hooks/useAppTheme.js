import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme, setTheme } from '../store/themeSlice';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/theme';

const THEME_PREFERENCE_KEY = '@theme_preference';

export const useAppTheme = () => {
	const dispatch = useDispatch();
	const theme = useSelector(selectTheme);
	const systemColorScheme = useColorScheme();

	// Load saved theme preference on mount
	useEffect(() => {
		loadThemePreference();
	}, []);

	// Load theme preference from storage
	const loadThemePreference = async () => {
		try {
			const savedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
			if (savedPreference !== null) {
				dispatch(setTheme(savedPreference === 'dark'));
			} else {
				// If no saved preference, use system theme
				dispatch(setTheme(systemColorScheme === 'dark'));
			}
		} catch (error) {
			console.error('Error loading theme preference:', error);
			// Fallback to system preference if there's an error
			dispatch(setTheme(systemColorScheme === 'dark'));
		}
	};

	// Toggle theme and save preference
	const handleToggleTheme = async () => {
		try {
			dispatch(toggleTheme());
			await AsyncStorage.setItem(
				THEME_PREFERENCE_KEY,
				!theme.isDarkMode ? 'dark' : 'light'
			);
		} catch (error) {
			console.error('Error saving theme preference:', error);
		}
	};

	// Ensure we always have valid colors even if theme state is not ready
	const colors =
		theme?.colors ||
		(systemColorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS);

	return {
		isDarkMode: theme?.isDarkMode ?? systemColorScheme === 'dark',
		colors,
		toggleTheme: handleToggleTheme,
	};
};
