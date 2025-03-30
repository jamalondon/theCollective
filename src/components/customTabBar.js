import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { tabBarStyles } from '../../style.js';

function CustomTabBar({ state, descriptors, navigation }) {
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

	return (
		<View style={tabBarStyles.mainContainer}>
			<View style={tabBarStyles.container}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label = options.tabBarLabel || options.title || route.name;
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

					// Get appropriate icon
					const iconName = iconMap[route.name] || 'ellipsis-horizontal';

					return (
						<TouchableOpacity
							key={route.key}
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
									<Ionicons
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
				})}
			</View>

			{/* Floating Action Button */}
			<TouchableOpacity
				style={tabBarStyles.plusButton}
				onPress={() => navigation.navigate('Create Event')}
			>
				<Ionicons name="add" size={30} color="white" />
			</TouchableOpacity>
		</View>
	);
}

export default CustomTabBar;
