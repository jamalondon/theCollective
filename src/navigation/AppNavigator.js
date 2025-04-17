import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/ProfileScreen';
import Home from '../screens/HomeScreen';
import Sermons from '../screens/SermonsScreen';
import MeetTheTeam from '../screens/MeetTheTeamScreen';
import CreateEventScreen from '../screens/CreateEvent';
import CustomTabBar from '../components/customTabBar.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: 'transparent',
					elevation: 0,
					borderTopWidth: 0,
				},
			}}
		>
			<Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
			<Tab.Screen name="Sermons" component={Sermons} />
			<Tab.Screen
				name="Create Event"
				component={EmptyComponent}
				options={{
					tabBarButton: () => null,
				}}
			/>
			<Tab.Screen name="Reach Out" component={MeetTheTeam} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}

// Empty component for the create button in the tab bar
const EmptyComponent = () => null;

export default function AppNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				presentation: 'modal',
			}}
		>
			<Stack.Screen name="Main" component={TabNavigator} />
			<Stack.Screen
				name="CreateEvent"
				component={CreateEventScreen}
				options={{
					presentation: 'modal',
					animation: 'slide_from_bottom',
				}}
			/>
		</Stack.Navigator>
	);
}
