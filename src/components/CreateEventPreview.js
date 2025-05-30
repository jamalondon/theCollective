import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONTS } from '../constants/theme';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useAppTheme } from '../hooks/useAppTheme';

const CreateEventPreview = ({
	eventTitle,
	selectedTags,
	eventDate,
	eventLocation,
	eventDescription,
	attendees,
}) => {
	const { createEventStyles } = useThemedStyles();
	const { colors } = useAppTheme();

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

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
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
			color: colors.text.dark,
			marginBottom: SPACING.sm,
		},
		tagsContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginTop: SPACING.xs,
		},
		tag: {
			backgroundColor: colors.primary + '20',
			paddingHorizontal: SPACING.md,
			paddingVertical: SPACING.xs,
			borderRadius: 20,
			marginRight: SPACING.xs,
			marginBottom: SPACING.xs,
		},
		tagText: {
			color: colors.text.primary,
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
			color: colors.text.dark,
			marginLeft: SPACING.sm,
		},
		dateText: {
			fontSize: FONTS.sizes.md,
			color: colors.text.dark,
			marginBottom: SPACING.xs,
		},
		timeText: {
			fontSize: FONTS.sizes.md,
			color: colors.text.secondary,
		},
		locationText: {
			fontSize: FONTS.sizes.md,
			color: colors.text.dark,
		},
		descriptionText: {
			fontSize: FONTS.sizes.md,
			color: colors.text.dark,
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
			backgroundColor: colors.primary + '20',
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: SPACING.md,
		},
		avatarText: {
			fontSize: FONTS.sizes.md,
			fontWeight: FONTS.weights.semibold,
			color: colors.primary,
		},
		attendeeInfo: {
			flex: 1,
		},
		attendeeName: {
			fontSize: FONTS.sizes.md,
			fontWeight: FONTS.weights.medium,
			color: colors.text.dark,
		},
		attendeeUsername: {
			fontSize: FONTS.sizes.sm,
			color: colors.text.secondary,
			marginTop: 2,
		},
	});

	return (
		<ScrollView
			style={createEventStyles.mainContainer}
			showsVerticalScrollIndicator={false}
		>
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
					<Ionicons name="calendar" size={24} color={colors.primary} />
					<Text style={styles.sectionTitle}>Date & Time</Text>
				</View>
				<Text style={styles.dateText}>{formatDate(eventDate)}</Text>
				<Text style={styles.timeText}>{formatTime(eventDate)}</Text>
			</View>

			{/* Location */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="location" size={24} color={colors.primary} />
					<Text style={styles.sectionTitle}>Location</Text>
				</View>
				<Text style={styles.locationText}>{eventLocation}</Text>
			</View>

			{/* Description */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="document-text" size={24} color={colors.primary} />
					<Text style={styles.sectionTitle}>Description</Text>
				</View>
				<Text style={styles.descriptionText}>{eventDescription}</Text>
			</View>

			{/* Attendees */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="people" size={24} color={colors.primary} />
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

export default CreateEventPreview;
