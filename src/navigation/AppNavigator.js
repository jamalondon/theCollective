import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Sermons from '../screens/Sermons';

const Tab = createBottomTabNavigator();

export default function AppNavigator({ navigation }) {
	return (
		<Tab.Navigator initialRouteName="HomeScreen" tabBarVisible={false}>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
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
		</Tab.Navigator>
	);
}
