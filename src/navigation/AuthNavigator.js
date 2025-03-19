import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn.js';
import SignUp from '../screens/SignUp.js';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
	return (
		<Stack.Navigator initialRouteName="SignIn">
			<Stack.Screen
				name="SignIn"
				component={SignIn}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
