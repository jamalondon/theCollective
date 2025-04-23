import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//Redux Store
import { Provider } from 'react-redux';
import store from './src/store';

//navgiation imports
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/navigationRef';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

//handling navigation between authFlow and main AppFlow
const Stack = createNativeStackNavigator();

function RootNavigator() {
	return (
		<>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Auth"
			>
				<Stack.Screen name="Auth" component={AuthNavigator} />
				<Stack.Screen name="App" component={AppNavigator} />
			</Stack.Navigator>
		</>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer ref={navigationRef}>
					<RootNavigator />
				</NavigationContainer>
			</GestureHandlerRootView>
		</Provider>
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
