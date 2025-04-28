import { useSelector, useDispatch } from 'react-redux';
import {
	selectTheme,
	toggleTheme,
	setTheme,
	setSystemTheme,
} from '../store/themeSlice';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/theme';

const THEME_PREFERENCE_KEY = '@theme_preference';
const SYSTEM_THEME_KEY = '@use_system_theme';

export const useAppTheme = () => {
	const dispatch = useDispatch();
	const theme = useSelector(selectTheme);
	const systemColorScheme = useColorScheme();

	// Load saved theme preference on mount
	useEffect(() => {
		loadThemePreference();
	}, []);

	// Watch for system theme changes
	useEffect(() => {
		if (theme.isSystemTheme) {
			dispatch(setSystemTheme(systemColorScheme === 'dark'));
		}
	}, [systemColorScheme, theme.isSystemTheme]);

	// Load theme preference from storage
	const loadThemePreference = async () => {
		try {
			const [savedPreference, useSystemTheme] = await Promise.all([
				AsyncStorage.getItem(THEME_PREFERENCE_KEY),
				AsyncStorage.getItem(SYSTEM_THEME_KEY),
			]);

			if (useSystemTheme === 'true') {
				dispatch(setSystemTheme(systemColorScheme === 'dark'));
			} else if (savedPreference !== null) {
				dispatch(setTheme(savedPreference === 'dark'));
			} else {
				// If no saved preference, use system theme
				dispatch(setSystemTheme(systemColorScheme === 'dark'));
			}
		} catch (error) {
			console.error('Error loading theme preference:', error);
			// Fallback to system preference if there's an error
			dispatch(setSystemTheme(systemColorScheme === 'dark'));
		}
	};

	// Toggle theme and save preference
	const handleToggleTheme = async () => {
		try {
			dispatch(toggleTheme());
			await Promise.all([
				AsyncStorage.setItem(
					THEME_PREFERENCE_KEY,
					!theme.isDarkMode ? 'dark' : 'light'
				),
				AsyncStorage.setItem(SYSTEM_THEME_KEY, 'false'),
			]);
		} catch (error) {
			console.error('Error saving theme preference:', error);
		}
	};

	// Enable system theme
	const enableSystemTheme = async () => {
		try {
			dispatch(setSystemTheme(systemColorScheme === 'dark'));
			await Promise.all([
				AsyncStorage.setItem(SYSTEM_THEME_KEY, 'true'),
				AsyncStorage.removeItem(THEME_PREFERENCE_KEY),
			]);
		} catch (error) {
			console.error('Error saving system theme preference:', error);
		}
	};

	// Ensure we always have valid colors even if theme state is not ready
	const colors =
		theme?.colors ||
		(systemColorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS);

	return {
		isDarkMode: theme?.isDarkMode ?? systemColorScheme === 'dark',
		isSystemTheme: theme?.isSystemTheme ?? true,
		colors,
		toggleTheme: handleToggleTheme,
		enableSystemTheme,
	};
};
