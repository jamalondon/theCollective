import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Icon from './Icon.js';
import TabButton from './tabButton.js';
import { useThemedStyles } from '../hooks/useThemedStyles';

function CustomTabBar({ state, descriptors, navigation }) {
	const [isOpen, setIsOpen] = useState(false);
	const animation = useRef(new Animated.Value(0)).current;
	const { tabBarStyles } = useThemedStyles();

	const toggleMenu = () => {
		const toValue = isOpen ? 0 : 1;
		setIsOpen(!isOpen);

		Animated.spring(animation, {
			toValue,
			friction: 5,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	// Animation interpolations for sub-buttons
	const eventButtonStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -80],
				}),
			},
		],
		opacity: animation,
	};

	const prayerButtonStyle = {
		transform: [
			{ scale: animation },
			{
				translateY: animation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -140],
				}),
			},
		],
		opacity: animation,
	};

	// Rotation animation for the plus icon
	const rotateStyle = {
		transform: [
			{
				rotate: animation.interpolate({
					inputRange: [0, 1],
					outputRange: ['0deg', '45deg'],
				}),
			},
		],
	};

	const handleCreateEvent = () => {
		toggleMenu();
		navigation.getParent().navigate('CreateEvent');
	};

	return (
		<View style={tabBarStyles.mainContainer}>
			<View style={tabBarStyles.container}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label = route.name;
					const isFocused = state.index === index;

					// Skip rendering if we're at the middle position
					if (index === Math.floor(state.routes.length / 2)) {
						return <View key={`placeholder-${index}`} style={{ width: 80 }} />;
					}

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};
					return (
						<TabButton
							key={route.key || `tab-${index}`}
							keyID={route.key || `tab-${index}`}
							onPress={onPress}
							route={route}
							isFocused={isFocused}
							label={label}
						/>
					);
				})}
			</View>

			{/* Sub FABs */}
			<Animated.View style={[tabBarStyles.fabButton, eventButtonStyle]}>
				<TouchableOpacity
					style={tabBarStyles.subButton}
					onPress={handleCreateEvent}
				>
					<Icon.IoniconsIcon name="calendar" size={20} color="white" />
					<Text style={tabBarStyles.subButtonText}>New Event</Text>
				</TouchableOpacity>
			</Animated.View>

			<Animated.View style={[tabBarStyles.fabButton, prayerButtonStyle]}>
				<TouchableOpacity
					style={tabBarStyles.subButton}
					onPress={() => {
						toggleMenu();
						navigation.navigate('PrayerRequest');
					}}
				>
					<Icon.IoniconsIcon name="heart" size={20} color="white" />
					<Text style={tabBarStyles.subButtonText}>Prayer Request</Text>
				</TouchableOpacity>
			</Animated.View>

			{/* Main FAB */}
			<TouchableOpacity
				style={tabBarStyles.plusButton}
				onPress={toggleMenu}
				activeOpacity={0.8}
			>
				<Animated.View style={rotateStyle}>
					<Icon.IoniconsIcon name="add" size={30} color="white" />
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
}

export default CustomTabBar;
