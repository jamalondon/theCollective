import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { tabBarStyles } from '../constants/style.js';
import Icon from './Icon.js';

function TabButton({
	keyID,
	onPress,
	onLongPress,
	route,
	isFocused,
	color,
	label,
}) {
	// Map of icons for each route
	const iconMap = {
		Explore: 'compass',
		Events: 'calendar',
		Home: 'home',
		'Reach Out': 'people',
		Profile: 'person',
		'Create Event': 'add',
		Sermons: 'book',
	};

	// Get appropriate icon
	const iconName = iconMap[route.name] || 'ellipsis-horizontal';
	return (
		<TouchableOpacity
			key={keyID}
			accessibilityRole="button"
			accessibilityState={isFocused ? { selected: true } : {}}
			onPress={onPress}
			style={tabBarStyles.tabButton}
		>
			<View style={tabBarStyles.tabItem}>
				<View
					style={[
						tabBarStyles.iconContainer,
						isFocused ? tabBarStyles.activeIconContainer : null,
					]}
				>
					<Icon.IoniconsIcon
						name={iconName}
						size={30}
						color={isFocused ? '#4169E1' : '#AAAAAA'}
					/>
				</View>
				<Text
					style={[
						tabBarStyles.tabText,
						isFocused
							? tabBarStyles.activeTabText
							: tabBarStyles.inactiveTabText,
					]}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

export default TabButton;
