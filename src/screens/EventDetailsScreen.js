import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	Animated,
} from 'react-native';
import { useCardAnimation } from '@react-navigation/stack';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEventById,
	attendEvent,
	cancelAttendance,
} from '../store/eventThunk';
import formatDate from '../hooks/useFormatDate';
import Icon from '../components/Icon';
import { useAppTheme } from '../hooks/useAppTheme';
import HorizontalLineSeperator from '../components/HorizontalSectionSeparator';

const EventDetails = ({ route, navigation }) => {
	const { eventID } = route.params;
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();
	const { eventDetailStyles } = useThemedStyles();
	const { colors } = useAppTheme();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isAttending, setIsAttending] = useState(false);
	const currentUser = useSelector((state) => state.user.userID);
	const event = useSelector((state) =>
		state.events.allEvents.find((e) => e.id === eventID)
	);

	useEffect(() => {
		const loadEventDetails = async () => {
			try {
				await dispatch(getEventById(event.id)).unwrap();
				setIsLoading(false);
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
			}
		};
		loadEventDetails();
	}, [dispatch, event.id]);

	useEffect(() => {
		if (event?.attendees) {
			const isUserAttending = event.attendees.some(
				(attendee) => attendee.user.id === currentUser
			);
			setIsAttending(isUserAttending);
		}
	}, [event?.attendees, currentUser]);

	const handleAttendance = async () => {
		try {
			if (isAttending) {
				await dispatch(cancelAttendance(event.id)).unwrap();
			} else {
				await dispatch(attendEvent(event.id)).unwrap();
			}
			setIsAttending(!isAttending);
		} catch (err) {
			// Handle error
			console.error(err);
		}
	};

	if (isLoading) {
		return (
			<View style={[eventDetailStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}

	if (error || !event) {
		return (
			<View style={[eventDetailStyles.container, { justifyContent: 'center' }]}>
				<Text style={[eventDetailStyles.errorText, { color: colors.error }]}>
					{error || 'Event not found'}
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={[
				eventDetailStyles.container,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
		>
			<View style={eventDetailStyles.scrollView}>
				{/*Back Button*/}
				<TouchableOpacity onPress={navigation.goBack}>
					<Icon.IoniconsIcon
						name="arrow-back"
						size={32}
						color={colors.primary}
					/>
				</TouchableOpacity>

				{/* Header Section */}
				<View style={eventDetailStyles.headerSection}>
					<Image
						source={{ uri: event.owner.profile_picture }}
						style={eventDetailStyles.hostImage}
					/>
					<View style={eventDetailStyles.title}>
						<Text style={eventDetailStyles.title}>{event.title}</Text>
						<Text
							style={[
								eventDetailStyles.subtitle,
								{ color: colors.textSecondary },
							]}
						>
							hosted by {event.owner.name}
						</Text>
					</View>
				</View>

				{/* Event Details Section */}
				<View style={eventDetailStyles.detailRow}>
					<Icon.IoniconsIcon name="calendar" size={24} color={colors.primary} />
					<Text style={[eventDetailStyles.text, { paddingLeft: 10 }]}>
						{formatDate(new Date(event.date))}
					</Text>
				</View>

				<View style={eventDetailStyles.detailRow}>
					<Icon.MaterialIcon
						name="map-marker"
						size={24}
						color={colors.primary}
					/>
					<Text style={[eventDetailStyles.text, { paddingLeft: 10 }]}>
						{event.location}
					</Text>
				</View>

				<View style={eventDetailStyles.descriptionContainer}>
					<HorizontalLineSeperator text={'About this event'} />
					<Text style={eventDetailStyles.description}>{event.description}</Text>
				</View>

				{/* Attendees Section */}
				<HorizontalLineSeperator
					text={`Attendees (${event.attendees.length})`}
				/>
				<View style={eventDetailStyles.attendeesList}>
					{event.attendees.map((attendee, index) => (
						<View key={index} style={eventDetailStyles.attendeeItem}>
							<Image
								source={{ uri: attendee.user.profile_picture }}
								style={eventDetailStyles.attendeeImage}
							/>
							<Text style={eventDetailStyles.text}>{attendee.user.name}</Text>
						</View>
					))}
				</View>

				{/* Tags Section */}
				{event.tags && event.tags.length > 0 && (
					<View style={eventDetailStyles.tagsSection}>
						<Text
							style={[eventDetailStyles.sectionTitle, { color: colors.text }]}
						>
							Tags
						</Text>
						<View style={eventDetailStyles.tagsList}>
							{event.tags.map((tag, index) => (
								<View
									key={index}
									style={[
										eventDetailStyles.tagItem,
										{ backgroundColor: colors.primary },
									]}
								>
									<Text
										style={[
											eventDetailStyles.tagText,
											{ color: colors.textLight },
										]}
									>
										{tag}
									</Text>
								</View>
							))}
						</View>
					</View>
				)}
			</View>

			{/* Attendance Button */}
			{currentUser !== event.owner.id && (
				<TouchableOpacity
					style={[
						eventDetailStyles.attendButton,
						{
							backgroundColor: isAttending ? colors.error : colors.primary,
						},
					]}
					onPress={handleAttendance}
				>
					<Text style={eventDetailStyles.attendButtonText}>
						{isAttending ? 'Cancel Attendance' : 'Attend Event'}
					</Text>
				</TouchableOpacity>
			)}
		</ScrollView>
	);
};

export default EventDetails;
