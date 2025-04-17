import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tryLocalSignIn } from '../store/userThunks.js';
import * as RootNavigation from '../navigation/navigationRef';
import * as ExpoSplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

const INITIALIZATION_TIMEOUT = 30000; // 30 seconds

const SplashScreen = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	const [isInitialized, setIsInitialized] = useState(false);

	// Handle initialization
	useEffect(() => {
		const initializeApp = async () => {
			try {
				const timeoutPromise = new Promise((_, reject) => {
					setTimeout(() => {
						reject(new Error('Initialization timed out after 30 seconds'));
					}, INITIALIZATION_TIMEOUT);
				});

				await Promise.race([dispatch(tryLocalSignIn()), timeoutPromise]);
				setIsInitialized(true);
			} catch (error) {
				setIsInitialized(true);
			}
		};

		initializeApp();
	}, []);

	// Handle navigation and splash screen hiding
	useEffect(() => {
		const handleStateChange = async () => {
			if (isInitialized) {
				try {
					await ExpoSplashScreen.hideAsync();
					if (token === null) {
						RootNavigation.navigate('Auth');
					} else if (token) {
						RootNavigation.navigate('App');
					}
				} catch (error) {
					if (token === null) {
						RootNavigation.navigate('Auth');
					} else if (token) {
						RootNavigation.navigate('App');
					}
				}
			}
		};

		handleStateChange();
	}, [isInitialized, token]);

	return (
		<View style={styles.container}>
			<Image
				source={require('../data/images/logo.jpg')}
				style={styles.logo}
				resizeMode="contain"
			/>
			<Text style={styles.title}>The Collective</Text>
			<Text style={styles.subtitle}>Loading...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	logo: {
		width: 150,
		height: 150,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
	},
});

export default SplashScreen;
