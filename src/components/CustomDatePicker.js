import React from 'react';
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const CORAL_COLOR = '#FF6B6B';

const CustomDatePicker = ({ visible, onClose, onSelectDate, selectedDate }) => {
	const currentDate = selectedDate || new Date();
	const formattedDate = currentDate.toISOString().split('T')[0];

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Select Date</Text>
					<Calendar
						current={formattedDate}
						minDate={new Date().toISOString().split('T')[0]}
						onDayPress={(day) => {
							const selectedDate = new Date(day.timestamp);
							onSelectDate(selectedDate);
						}}
						markedDates={{
							[formattedDate]: {
								selected: true,
								selectedColor: CORAL_COLOR,
							},
						}}
						theme={{
							todayTextColor: CORAL_COLOR,
							selectedDayBackgroundColor: CORAL_COLOR,
							selectedDayTextColor: '#ffffff',
							arrowColor: CORAL_COLOR,
							monthTextColor: '#333',
							textMonthFontWeight: 'bold',
							textDayFontSize: 16,
							textMonthFontSize: 16,
							textDayHeaderFontSize: 14,
						}}
					/>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		width: Dimensions.get('window').width * 0.9,
		maxHeight: Dimensions.get('window').height * 0.8,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		color: '#333',
		marginBottom: 20,
		textAlign: 'center',
	},
	closeButton: {
		backgroundColor: CORAL_COLOR,
		padding: 15,
		borderRadius: 10,
		marginTop: 20,
		alignItems: 'center',
	},
	closeButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default CustomDatePicker;
