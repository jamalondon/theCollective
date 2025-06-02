import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Animated,
	Alert,
	Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../components/CustomDatePicker';

import CreateEventBasicInfo from '../components/CreateEventBasicInfo';
import CreateEventLocationTime from '../components/CreateEventLocationTime';
import CreateEventDetailsAttendees from '../components/CreateEventDetailsAttendees';
import CreateEventPreview from '../components/CreateEventPreview';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useCreateEventAnimations } from '../animations/createEventAnimations';
import { createEvent } from '../store/eventThunk';

const popularLocations = [
	{ id: '1', name: 'Los Angeles', subtitle: 'California, United States' },
	{ id: '2', name: 'San Francisco', subtitle: 'California, United States' },
];

const CreateEventScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.events);
	const { name: userName } = useSelector((state) => state.user);
	const insets = useSafeAreaInsets();
	const [currentStep, setCurrentStep] = useState(1);
	const [eventTitle, setEventTitle] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [error, setError] = useState('');
	const [eventDate, setEventDate] = useState(new Date());
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [attendees, setAttendees] = useState([]);
	const { createEventStyles, authStyles } = useThemedStyles();

	// State for modal visibility
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [focusedInput, setFocusedInput] = useState(null);

	// Get animations
	const {
		progressAnim,
		errorShakeAnim,
		buttonScaleAnim,
		animateProgress,
		shakeError,
		handleButtonPressIn,
		handleButtonPressOut,
	} = useCreateEventAnimations();

	useEffect(() => {
		animateProgress(currentStep);
	}, [currentStep]);

	const handleTagPress = (tagLabel) => {
		setSelectedTags((prevTags) =>
			prevTags.includes(tagLabel)
				? prevTags.filter((label) => label !== tagLabel)
				: [...prevTags, tagLabel]
		);
	};

	const handleDateSelect = (date) => {
		const newDate = new Date(eventDate);
		newDate.setFullYear(date.getFullYear());
		newDate.setMonth(date.getMonth());
		newDate.setDate(date.getDate());
		console.log('newDate', newDate);
		setEventDate(newDate);
	};

	const handleTimeSelect = (date) => {
		const newDate = new Date(eventDate);
		newDate.setHours(date.getHours());
		newDate.setMinutes(date.getMinutes());
		setEventDate(newDate);
		setShowTimePicker(false);
	};

	const handleCreateEvent = async () => {
		const eventPayload = {
			title: eventTitle,
			tags: selectedTags,
			date: eventDate.toISOString(),
			location: eventLocation,
			description: eventDescription,
			attendees: attendees.map((user) => user.id), // Assuming attendees have an id field
		};

		try {
			await dispatch(createEvent(eventPayload)).unwrap();
			Alert.alert('Success', 'Event created successfully!');
			navigation.goBack();
		} catch (error) {
			Alert.alert('Error', error.message || 'Failed to create event');
		}
	};

	const validateAndProceed = () => {
		if (currentStep === 1) {
			if (
				!eventTitle.trim() ||
				!eventLocation.trim() ||
				!eventDescription.trim()
			) {
				Alert.alert(
					'Information Required',
					'Please fill out all information to create the event!'
				);
				return;
			}
			setError('');
			setCurrentStep(2);
		} else if (currentStep === 2) {
			handleCreateEvent();
		}
	};

	const handleBack = () => {
		if (currentStep === 1) {
			navigation.goBack();
		} else {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<KeyboardAvoidingView
			style={[
				createEventStyles.mainContainer,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{/* Progress Indicator */}
			<View style={createEventStyles.progressContainer}>
				<View style={createEventStyles.progressBar}>
					<Animated.View
						style={[
							createEventStyles.progressFill,
							{
								width: progressAnim.interpolate({
									inputRange: [0.5, 1],
									outputRange: ['50%', '100%'],
								}),
							},
						]}
					/>
				</View>
			</View>

			{/* Main Content */}
			<ScrollView
				style={[createEventStyles.mainContent, { width: '100%' }]}
				showsVerticalScrollIndicator={false}
			>
				{currentStep === 1 ? (
					<>
						<Text style={createEventStyles.title}>{'Create New Event'}</Text>
						<Text style={createEventStyles.subtitle}>
							{"Let's start with the basics"}
						</Text>
						<CreateEventBasicInfo
							eventTitle={eventTitle}
							setEventTitle={setEventTitle}
							selectedTags={selectedTags}
							onTagPress={handleTagPress}
							error={error}
							errorShakeAnim={errorShakeAnim}
							userName={userName}
						/>
						<Text style={createEventStyles.title}>{'When & Where'}</Text>
						<Text style={createEventStyles.subtitle}>
							{'Set your event location and time'}
						</Text>
						<CreateEventLocationTime
							eventLocation={eventLocation}
							setEventLocation={setEventLocation}
							eventDate={eventDate}
							onDatePress={() => setShowDatePicker(true)}
							onTimePress={() => setShowTimePicker(true)}
							popularLocations={popularLocations}
							errorShakeAnim={errorShakeAnim}
							error={error}
						/>
						<Text style={createEventStyles.title}>{'What & Who'}</Text>
						<Text style={createEventStyles.subtitle}>
							{'Add description and invite people'}
						</Text>
						<CreateEventDetailsAttendees
							description={eventDescription}
							setDescription={setEventDescription}
							attendees={attendees}
							setAttendees={setAttendees}
							error={error}
							errorShakeAnim={errorShakeAnim}
						/>
					</>
				) : currentStep === 2 ? (
					<CreateEventPreview
						eventTitle={eventTitle}
						selectedTags={selectedTags}
						eventDate={eventDate}
						eventLocation={eventLocation}
						eventDescription={eventDescription}
						attendees={attendees}
					/>
				) : null}
			</ScrollView>

			{/* Bottom Buttons */}
			<View style={createEventStyles.buttonContainer}>
				<TouchableOpacity
					style={createEventStyles.backButton}
					onPress={handleBack}
					activeOpacity={0.7}
				>
					<Text style={createEventStyles.backButtonText}>
						{currentStep === 1 ? 'Cancel' : 'Back'}
					</Text>
				</TouchableOpacity>
				<Animated.View
					style={[
						createEventStyles.nextButtonContainer,
						{ transform: [{ scale: buttonScaleAnim }] },
					]}
				>
					<TouchableOpacity
						style={[
							createEventStyles.nextButton,
							currentStep === 4 && createEventStyles.createButton,
						]}
						activeOpacity={1}
						onPressIn={handleButtonPressIn}
						onPressOut={handleButtonPressOut}
						onPress={validateAndProceed}
					>
						<Text style={createEventStyles.nextButtonText}>
							{currentStep === 4 ? 'Create Event' : 'Next'}
						</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
			<CustomDatePicker
				visible={showDatePicker}
				closeModal={() => setShowDatePicker(false)}
				onSelectDate={handleDateSelect}
				selectedDate={eventDate}
				maximumDate={
					new Date(new Date().setFullYear(new Date().getFullYear() + 2))
				}
				minimumDate={new Date()}
				mode="date"
			/>

			<CustomDatePicker
				visible={showTimePicker}
				closeModal={() => setShowTimePicker(false)}
				onSelectDate={handleTimeSelect}
				selectedDate={eventDate}
				mode="time"
				maximumDate={
					new Date(new Date().setFullYear(new Date().getFullYear() + 2))
				}
			/>
		</KeyboardAvoidingView>
	);
};

export default CreateEventScreen;
