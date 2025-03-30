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

export default function AppNavigator({ navigation }) {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBarVisible={false}
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false, title: 'Home' }}
			/>
			<Tab.Screen
				name="Sermons"
				component={Sermons}
				options={{ headerShown: false }}
			/>

			<Tab.Screen
				name="Create Event"
				component={CreateEventScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Reach Out"
				component={MeetTheTeam}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}
