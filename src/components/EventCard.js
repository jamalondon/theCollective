import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from './Icon';

// const EventCard = ({ event, onPress }) => {
// 	// Format the date and time to readable strings
// 	const formatDateTime = (dateString) => {
// 		const date = new Date(dateString);
// 		const timeStr = date.toLocaleTimeString('en-US', {
// 			hour: 'numeric',
// 			minute: '2-digit',
// 			hour12: true,
// 		});
// 		const dateStr = date.toLocaleDateString('en-US', {
// 			weekday: 'short',
// 			month: 'short',
// 			day: 'numeric',
// 			year: 'numeric',
// 		});
// 		return { dateStr, timeStr };
// 	};

// 	const { dateStr, timeStr } = formatDateTime(event.date || event.created_at);

// 	return (
// 		<TouchableOpacity style={styles.card} onPress={onPress}>
// 			<View style={styles.contentContainer}>
// 				<View style={styles.headerContainer}>
// 					<Image
// 						source={{ uri: event.owner.profile_picture }}
// 						style={styles.avatar}
// 					/>
// 					<View style={styles.titleContainer}>
// 						<Text style={styles.title}>{event.title}</Text>
// 						<View style={styles.dateTimeContainer}>
// 							<Icon.IoniconsIcon name="time-outline" size={14} color="#666" />
// 							<Text style={styles.dateTimeText}>
// 								{dateStr} • {timeStr}
// 							</Text>
// 						</View>
// 					</View>
// 				</View>
// 				<Text style={styles.description} numberOfLines={3}>
// 					{event.description}
// 				</Text>
// 				{event.tags && event.tags.length > 0 && (
// 					<View style={styles.tagsContainer}>
// 						{event.tags.map((tag, index) => (
// 							<View key={index} style={styles.tag}>
// 								<Text style={styles.tagText}>{tag}</Text>
// 							</View>
// 						))}
// 					</View>
// 				)}
// 				<View style={styles.footerContainer}>
// 					<View style={styles.locationContainer}>
// 						<Icon.IoniconsIcon name="location" size={16} color="#666" />
// 						<Text style={styles.locationText} numberOfLines={1}>
// 							{event.location}
// 						</Text>
// 					</View>
// 					<View style={styles.attendeesContainer}>
// 						<Icon.IoniconsIcon name="people" size={16} color="#666" />
// 						<Text style={styles.attendeesText}>
// 							{event.attendees?.length || 0} attending
// 						</Text>
// 					</View>
// 				</View>
// 			</View>
// 		</TouchableOpacity>
// 	);
// };

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 12,
		marginHorizontal: 10,
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
		overflow: 'hidden',
		padding: 16,
	},
	avatarContainer: {
		padding: 12,
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 76,
		backgroundColor: 'red',
	},
	avatar: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: '#f0f0f0',
	},
	contentContainer: {
		flex: 1,
	},
	titleContainer: {
		flexDirection: 'column',
		alignSelf: 'center',
		marginLeft: 8,
	},
	headerContainer: {
		marginBottom: 8,
		flexDirection: 'row',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 4,
	},
	dateTimeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dateTimeText: {
		fontSize: 12,
		color: '#666',
		marginLeft: 4,
	},
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
		lineHeight: 20,
	},
	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 8,
	},
	tag: {
		backgroundColor: '#e9ecef',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginRight: 6,
		marginBottom: 4,
	},
	tagText: {
		fontSize: 12,
		color: '#495057',
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 4,
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginRight: 8,
	},
	locationText: {
		marginLeft: 4,
		fontSize: 12,
		color: '#666',
		flex: 1,
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
});

export default EventCard;
