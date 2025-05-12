import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tryLocalSignIn } from '../store/userThunks.js';
import * as RootNavigation from '../navigation/navigationRef';

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

				const minimumDurationPromise = new Promise((resolve) => {
					setTimeout(resolve, MINIMUM_SPLASH_DURATION);
				});

				// Wait for both the minimum duration AND the initialization
				await Promise.race([dispatch(tryLocalSignIn()), timeoutPromise]);

				setIsInitialized(true);
			} catch (error) {
				console.log('Initialization error:', error);

				setIsInitialized(false);
			}
		};

		initializeApp();
	}, []);

	// Handle navigation
	useEffect(() => {
		if (isInitialized) {
			if (token === null) {
				RootNavigation.navigate('Welcome');
			} else if (token) {
				RootNavigation.navigate('App');
			}
		}
	}, [isInitialized, token]);

	return (
		<View style={styles.container}>
			<Image
				source={require('../data/images/logo-transparent.png')}
				style={styles.logo}
				resizeMode="contain"
			/>
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
		zIndex: 2, // Ensure logo appears above the animation
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		zIndex: 2, // Ensure text appears above the animation
	},
});

export default SplashScreen;
