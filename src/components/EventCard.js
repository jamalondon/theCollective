import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './Icon';

const EventCard = ({ event, onPress }) => {
	// Format the date to a readable string
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<View style={styles.dateContainer}>
				<Text style={styles.date}>{formatDate(event.created_at)}</Text>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{event.title}</Text>
				<Text style={styles.description} numberOfLines={2}>
					{event.description}
				</Text>
				<View style={styles.footer}>
					<View style={styles.attendeesContainer}>
						<Icon.IoniconsIcon name="people" size={16} color="#666" />
						<Text style={styles.attendeesText}>
							{event.attendees?.length || 0} attending
						</Text>
					</View>
					<View style={styles.locationContainer}>
						<Icon.IoniconsIcon name="location" size={16} color="#666" />
						<Text style={styles.locationText}>{event.location}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 12,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		flexDirection: 'row',
	},
	dateContainer: {
		padding: 12,
		borderRightWidth: 1,
		borderRightColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
	},
	date: {
		fontSize: 12,
		color: '#666',
		textAlign: 'center',
	},
	contentContainer: {
		flex: 1,
		padding: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
		color: '#333',
	},
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	attendeesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	attendeesText: {
		marginLeft: 4,
		fontSize: 12,
		color: '#666',
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	locationText: {
		marginLeft: 4,
		fontSize: 12,
		color: '#666',
	},
});

export default EventCard;
