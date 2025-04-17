import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const CreateEventPreview = ({
	eventTitle,
	selectedTags,
	eventDate,
	eventLocation,
	eventDescription,
	attendees,
}) => {
	const formatDate = (date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatTime = (date) => {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* Event Header */}
			<View style={styles.section}>
				<Text style={styles.eventTitle}>{eventTitle}</Text>
				<View style={styles.tagsContainer}>
					{selectedTags.map((tag, index) => (
						<View key={index} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>
			</View>

			{/* Date & Time */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="calendar" size={24} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Date & Time</Text>
				</View>
				<Text style={styles.dateText}>{formatDate(eventDate)}</Text>
				<Text style={styles.timeText}>{formatTime(eventDate)}</Text>
			</View>

			{/* Location */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="location" size={24} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Location</Text>
				</View>
				<Text style={styles.locationText}>{eventLocation}</Text>
			</View>

			{/* Description */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="document-text" size={24} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Description</Text>
				</View>
				<Text style={styles.descriptionText}>{eventDescription}</Text>
			</View>

			{/* Attendees */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="people" size={24} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>
						Attendees ({attendees.length})
					</Text>
				</View>
				<View style={styles.attendeesContainer}>
					{attendees.map((attendee, index) => (
						<View key={index} style={styles.attendeeItem}>
							<View style={styles.attendeeAvatar}>
								<Text style={styles.avatarText}>{attendee.name[0]}</Text>
							</View>
							<View style={styles.attendeeInfo}>
								<Text style={styles.attendeeName}>{attendee.name}</Text>
								<Text style={styles.attendeeUsername}>{attendee.username}</Text>
							</View>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	section: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: SPACING.lg,
		marginBottom: SPACING.md,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	eventTitle: {
		fontSize: FONTS.sizes.xl,
		fontWeight: FONTS.weights.bold,
		color: COLORS.text.primary,
		marginBottom: SPACING.sm,
	},
	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: SPACING.xs,
	},
	tag: {
		backgroundColor: COLORS.primary + '20',
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.xs,
		borderRadius: 20,
		marginRight: SPACING.xs,
		marginBottom: SPACING.xs,
	},
	tagText: {
		color: COLORS.primary,
		fontSize: FONTS.sizes.sm,
		fontWeight: FONTS.weights.medium,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	sectionTitle: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.text.primary,
		marginLeft: SPACING.sm,
	},
	dateText: {
		fontSize: FONTS.sizes.md,
		color: COLORS.text.primary,
		marginBottom: SPACING.xs,
	},
	timeText: {
		fontSize: FONTS.sizes.md,
		color: COLORS.text.secondary,
	},
	locationText: {
		fontSize: FONTS.sizes.md,
		color: COLORS.text.primary,
	},
	descriptionText: {
		fontSize: FONTS.sizes.md,
		color: COLORS.text.primary,
		lineHeight: 24,
	},
	attendeesContainer: {
		marginTop: SPACING.sm,
	},
	attendeeItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	attendeeAvatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: COLORS.primary + '20',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: SPACING.md,
	},
	avatarText: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.primary,
	},
	attendeeInfo: {
		flex: 1,
	},
	attendeeName: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.medium,
		color: COLORS.text.primary,
	},
	attendeeUsername: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.text.secondary,
		marginTop: 2,
	},
});

export default CreateEventPreview;
