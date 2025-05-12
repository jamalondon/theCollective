import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Platform,
	KeyboardAvoidingView,
	Animated,
	Alert,
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
	const { loading, error } = useSelector((state) => state.events);
	const insets = useSafeAreaInsets();
	const [currentStep, setCurrentStep] = useState(1);
	const [eventTitle, setEventTitle] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [nameError, setNameError] = useState('');
	const [eventDate, setEventDate] = useState(new Date());
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [attendees, setAttendees] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
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

	const handleTagPress = (tagId) => {
		console.log('tagId', tagId);
		setSelectedTags((prevTags) =>
			prevTags.includes(tagId)
				? prevTags.filter((id) => id !== tagId)
				: [...prevTags, tagId]
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
			if (!eventTitle.trim() || selectedTags.length === 0) {
				shakeError();
				setNameError(
					!eventTitle.trim()
						? 'Please enter an event name'
						: 'Please select at least one tag'
				);
				return;
			}
			setNameError('');
			setCurrentStep(2);
		} else if (currentStep === 2) {
			if (!eventLocation.trim()) {
				shakeError();
				setNameError('Please enter a location');
				return;
			}
			setNameError('');
			setCurrentStep(3);
		} else if (currentStep === 3) {
			if (!eventDescription.trim()) {
				shakeError();
				setNameError('Please enter an event description');
				return;
			}
			setNameError('');
			setCurrentStep(4);
		} else {
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

	const getStepTitle = () => {
		switch (currentStep) {
			case 1:
				return 'Create New Event';
			case 2:
				return 'When & Where';
			case 3:
				return 'What & Who';
			case 4:
				return 'Preview Event';
			default:
				return '';
		}
	};

	const getStepSubtitle = () => {
		switch (currentStep) {
			case 1:
				return "Let's start with the basics";
			case 2:
				return 'Set your event location and time';
			case 3:
				return 'Add description and invite people';
			case 4:
				return 'Review your event details';
			default:
				return '';
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={[
				createEventStyles.mainContainer,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
		>
			{/* Progress Indicator */}
			<View style={createEventStyles.progressContainer}>
				<View style={createEventStyles.progressBar}>
					<Animated.View
						style={[
							createEventStyles.progressFill,
							{
								width: progressAnim.interpolate({
									inputRange: [0.25, 0.5, 0.75, 1],
									outputRange: ['25%', '50%', '75%', '100%'],
								}),
							},
						]}
					/>
				</View>
				<Text style={createEventStyles.stepText}>Step {currentStep} of 4</Text>
			</View>

			<ScrollView
				style={createEventStyles.subContainer}
				showsVerticalScrollIndicator={false}
			>
				{/* Main Content */}
				<View style={createEventStyles.mainContent}>
					<Text style={createEventStyles.title}>{getStepTitle()}</Text>
					<Text style={createEventStyles.subtitle}>{getStepSubtitle()}</Text>

					{currentStep === 1 ? (
						<CreateEventBasicInfo
							eventTitle={eventTitle}
							setEventTitle={setEventTitle}
							selectedTags={selectedTags}
							onTagPress={handleTagPress}
							nameError={nameError}
							errorShakeAnim={errorShakeAnim}
						/>
					) : currentStep === 2 ? (
						<CreateEventLocationTime
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							eventLocation={eventLocation}
							setEventLocation={setEventLocation}
							eventDate={eventDate}
							onDatePress={() => setShowDatePicker(true)}
							onTimePress={() => setShowTimePicker(true)}
							popularLocations={popularLocations}
							errorShakeAnim={errorShakeAnim}
							nameError={nameError}
						/>
					) : currentStep === 3 ? (
						<CreateEventDetailsAttendees
							description={eventDescription}
							setDescription={setEventDescription}
							attendees={attendees}
							setAttendees={setAttendees}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							nameError={nameError}
							errorShakeAnim={errorShakeAnim}
						/>
					) : (
						<CreateEventPreview
							eventTitle={eventTitle}
							selectedTags={selectedTags}
							eventDate={eventDate}
							eventLocation={eventLocation}
							eventDescription={eventDescription}
							attendees={attendees}
						/>
					)}
				</View>

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
			</ScrollView>
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
