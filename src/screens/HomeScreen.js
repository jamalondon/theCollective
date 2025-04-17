import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllEvents,
	getMyEvents,
	getAttendingEvents,
} from '../store/eventThunk';
import EventCard from '../components/EventCard';

const Home = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const [refreshing, setRefreshing] = useState(false);

	// Get events from Redux store
	const allEvents = useSelector((state) => state.events.allEvents);

	// Sort events by creation date
	const sortedEvents = useMemo(() => {
		return [...allEvents].sort((a, b) => {
			return (
				new Date(b.createdAt || b.createdAtFormatted) -
				new Date(a.createdAt || a.createdAtFormatted)
			);
		});
	}, [allEvents]);

	// Handle refresh
	const onRefresh = async () => {
		setRefreshing(true);
		try {
			await Promise.all([
				dispatch(getAllEvents()),
				dispatch(getMyEvents()),
				dispatch(getAttendingEvents()),
			]);
		} catch (error) {
			console.error('Error refreshing events:', error);
		}
		setRefreshing(false);
	};

	// Handle event press
	const handleEventPress = (event) => {
		// Navigate to event details screen
		// navigation.navigate('EventDetails', { eventId: event.id });
	};

	// Render empty state
	const renderEmptyState = () => (
		<View style={styles.emptyState}>
			<Text style={styles.emptyStateText}>No events found</Text>
			<Text style={styles.emptyStateSubtext}>Pull down to refresh</Text>
		</View>
	);

	return (
		<View
			style={[
				styles.container,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
		>
			<FlatList
				data={sortedEvents}
				renderItem={({ item }) => (
					<EventCard event={item} onPress={() => handleEventPress(item)} />
				)}
				keyExtractor={(item) => item.id}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListEmptyComponent={renderEmptyState}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f9fa',
	},
	listContent: {
		flexGrow: 1,
		paddingVertical: 8,
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 32,
	},
	emptyStateText: {
		fontSize: 18,
		fontWeight: '500',
		color: '#666',
		marginBottom: 8,
	},
	emptyStateSubtext: {
		fontSize: 14,
		color: '#999',
	},
});

export default Home;
