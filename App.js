import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//Redux Store
import { Provider } from 'react-redux';
import store from './src/store';
import { useDispatch, useSelector } from 'react-redux';
import { tryLocalSignIn } from './src/store/userThunks.js';
import { useAppTheme } from './src/hooks/useAppTheme';

//navgiation imports
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/navigationRef';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

//handling navigation between authFlow and main AppFlow
const Stack = createNativeStackNavigator();

function RootNavigator() {
	const { isDarkMode } = useAppTheme();

	return (
		<>
			<StatusBar style={isDarkMode ? 'light' : 'dark'} />
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Splash"
			>
				<Stack.Screen name="Splash" component={SplashScreen} />
				<Stack.Screen name="Loading" component={LoadingScreen} />
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
