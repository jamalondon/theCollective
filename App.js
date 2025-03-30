import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Redux Store
import { Provider } from 'react-redux';
import store from './src/store';
import { useDispatch, useSelector } from 'react-redux';
import { tryLocalSignIn } from './src/store/userThunks.js';

//navgiation imports
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/navigationRef';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/screens/LoadingScreen.js';
import AuthNavigator from './src/navigation/AuthNavigator.js';
import AppNavigator from './src/navigation/AppNavigator.js';

//handling navigation between authFlow and main AppFlow
const Stack = createNativeStackNavigator();

function RootNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Loading"
		>
			<Stack.Screen name="Loading" component={LoadingScreen} />
			<Stack.Screen name="Auth" component={AuthNavigator} />
			<Stack.Screen name="App" component={AppNavigator} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer ref={navigationRef}>
				<RootNavigator />
			</NavigationContainer>
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
