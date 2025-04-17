import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme, setTheme } from '../store/themeSlice';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

	return {
		isDarkMode: theme.isDarkMode,
		colors: theme.colors,
		toggleTheme: handleToggleTheme,
	};
};
