import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';

const ThemeToggle = () => {
	const { isDarkMode, toggleTheme, colors } = useAppTheme();
	const translateX = new Animated.Value(isDarkMode ? 1 : 0);

	useEffect(() => {
		Animated.spring(translateX, {
			toValue: isDarkMode ? 1 : 0,
			useNativeDriver: true,
			friction: 8,
			tension: 50,
		}).start();
	}, [isDarkMode]);

	const handlePress = () => {
		toggleTheme();
	};

	const toggleStyle = {
		transform: [
			{
				translateX: translateX.interpolate({
					inputRange: [0, 1],
					outputRange: [4, 36],
				}),
			},
		],
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={[
				styles.container,
				{
					backgroundColor: isDarkMode ? colors.border.default : '#E1E1E1',
				},
			]}
			activeOpacity={0.8}
		>
			<Animated.View
				style={[
					styles.toggle,
					toggleStyle,
					{
						backgroundColor: isDarkMode ? colors.primary : '#FFFFFF',
					},
				]}
			>
				<Ionicons
					name={isDarkMode ? 'moon' : 'sunny'}
					size={16}
					color={isDarkMode ? '#FFFFFF' : '#FDB813'}
				/>
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 70,
		height: 34,
		borderRadius: 17,
		padding: 2,
		justifyContent: 'center',
	},
	toggle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

export default ThemeToggle;
