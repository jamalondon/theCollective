import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import {
	getAllEvents,
	getMyEvents,
	getAttendingEvents,
} from '../store/eventThunk';
import * as RootNavigation from '../navigation/navigationRef';

const LoadingScreen = () => {
	const dispatch = useDispatch();

	// Function to fetch all event data
	const fetchEventData = async () => {
		try {
			await Promise.all([
				dispatch(getAllEvents()),
				dispatch(getMyEvents()),
				dispatch(getAttendingEvents()),
			]);
			// After all data is loaded, navigate to the main app
			RootNavigation.navigate('App');
		} catch (error) {
			console.error('Error loading data:', error);
			// Handle error appropriately
		}
	};

	useEffect(() => {
		fetchEventData();
	}, []);

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#0000ff" />
			<Text style={styles.text}>Loading your events...</Text>
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
	text: {
		marginTop: 10,
		fontSize: 16,
		color: '#666',
	},
});

export default LoadingScreen;
