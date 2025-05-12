import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllEvents,
	getMyEvents,
	getAttendingEvents,
} from '../store/eventThunk';
import { getPrayerRequests } from '../store/prayerRequestThunk';
//import EventCard from '../components/EventCard';
import { useThemedStyles } from '../hooks/useThemedStyles';

const Home = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const [refreshing, setRefreshing] = useState(false);
	const [newsFeed, setNewsFeed] = useState([]);
	const { appStyles } = useThemedStyles();

	// Get events from Redux store
	const allEvents = useSelector((state) => state.events.allEvents);
	//get prayer requests from Redux store
	const prayerRequests = useSelector(
		(state) => state.prayerRequests.prayerRequests
	);

	//async function to get data from server
	const fetchData = async () => {
		await Promise.all([
			dispatch(getAllEvents()),
			dispatch(getMyEvents()),
			dispatch(getAttendingEvents()),
			dispatch(getPrayerRequests()),
		]);
	};

	//get inital data from server
	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, []);

	// Combine events and prayer requests, then sort by creation date
	const sortedNewsFeed = useMemo(() => {
		// First, make sure both arrays exist
		const safeEvents = allEvents || [];
		const safePrayerRequests = prayerRequests || [];

		// Combine the two arrays
		const combined = [...safeEvents, ...safePrayerRequests];

		// Debug which date fields are being used
		console.log('Sample items:', {
			event: safeEvents.length ? safeEvents[0] : null,
			prayer: safePrayerRequests.length ? safePrayerRequests[0] : null,
		});

		// Sort by created_at date
		return combined.sort((a, b) => {
			// Determine which date field to use and log it
			const aField = a.created_at
				? 'created_at'
				: a.createdAt
				? 'createdAt'
				: 'date';
			const bField = b.created_at
				? 'created_at'
				: b.createdAt
				? 'createdAt'
				: 'date';

			const dateA = new Date(a[aField]);
			const dateB = new Date(b[bField]);
			return dateB - dateA;
		});
	}, [allEvents, prayerRequests]);

	console.log(sortedNewsFeed);
	// Handle refresh
	const onRefresh = async () => {
		setRefreshing(true);
		try {
			fetchData();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		setRefreshing(false);
	};

	// Handle event press
	const handleEventPress = (event) => {
		//console.log(event.attendees);
		// Navigate to event details screen
		navigation.navigate('EventDetails', { eventID: event.id });
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
				appStyles.container,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
		>
			<FlatList
				data={sortedNewsFeed}
				renderItem={({ item }) => (
					<View>
						<Text>{item.title}</Text>
					</View>
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
