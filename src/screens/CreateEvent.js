import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Platform,
	Alert,
	KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CreateEventScreen = ({ navigation, visible }) => {
	// Used for safe area on the screen (notches, native UI elements, etc.)
	const insets = useSafeAreaInsets();

	// State for form fields
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState(new Date());
	const [eventLocation, setEventLocation] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [attendees, setAttendees] = useState('');

	// State for date/time picker visibility
	const [showDatePicker, setShowDatePicker] = useState(false);

	// Form validation
	const validateForm = () => {
		if (!eventName.trim()) {
			Alert.alert('Error', 'Event name is required');
			return false;
		}
		if (!eventLocation.trim()) {
			Alert.alert('Error', 'Location is required');
			return false;
		}
		return true;
	};

	// Handle date change
	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || eventDate;
		setShowDatePicker(Platform.OS === 'ios');
		setEventDate(currentDate);
	};

	// Handle form submission
	const handleCreateEvent = () => {
		if (validateForm()) {
			// Create event object
			const newEvent = {
				name: eventName,
				date: eventDate,
				location: eventLocation,
				description: eventDescription,
				attendees: attendees.split(',').map((email) => email.trim()),
			};

			// Here you would typically save the event to your state management or backend
			console.log('Creating event:', newEvent);

			// Navigate back or to event details
			navigation.goBack();
			// Or: navigation.navigate('EventDetails', { eventId: newEventId });
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<ScrollView
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
				<Text style={styles.headerText}>Create New Event</Text>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Event Name *</Text>
					<TextInput
						style={styles.input}
						value={eventName}
						onChangeText={setEventName}
						placeholder="Enter event name"
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Date and Time *</Text>
					<TouchableOpacity
						style={styles.dateButton}
						onPress={() => setShowDatePicker(true)}
					>
						<Text>{eventDate.toLocaleString()}</Text>
					</TouchableOpacity>

					{showDatePicker && (
						<DateTimePicker
							value={eventDate}
							mode="datetime"
							display="default"
							onChange={onDateChange}
						/>
					)}
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Location *</Text>
					<TextInput
						style={styles.input}
						value={eventLocation}
						onChangeText={setEventLocation}
						placeholder="Enter event location"
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						value={eventDescription}
						onChangeText={setEventDescription}
						placeholder="Describe your event"
						multiline
						numberOfLines={4}
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Attendees (emails, comma separated)</Text>
					<TextInput
						style={styles.input}
						value={attendees}
						onChangeText={setAttendees}
						placeholder="Enter email addresses"
					/>
				</View>

				<TouchableOpacity
					style={styles.createButton}
					onPress={handleCreateEvent}
				>
					<Text style={styles.buttonText}>Create Event</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f8f8f8',
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#333',
	},
	inputGroup: {
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: '500',
		color: '#555',
	},
	input: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	textArea: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	dateButton: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	createButton: {
		backgroundColor: '#007bff',
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 30,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default CreateEventScreen;
