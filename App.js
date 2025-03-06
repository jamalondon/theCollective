import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator.js';
import AppNavigator from './src/navigation/AppNavigator.js';

//handling navigation between authFlow and main AppFlow
const Stack = createNativeStackNavigator();

function RootNavigator() {
	const { token } = useContext(AuthContext);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Auth" component={AuthNavigator} />
			<Stack.Screen name="App" component={AppNavigator} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer ref={navigationRef}>
			<RootNavigator />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
