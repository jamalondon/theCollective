import React, { useState } from 'react';
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CORAL_COLOR = '#FF6B6B';

const CustomDatePicker = ({
	visible,
	closeModal,
	onSelectDate,
	selectedDate,
	minimumDate,
	maximumDate,
}) => {
	const [tempDate, setTempDate] = useState(selectedDate || new Date());

	const handleChange = (event, date, option) => {
		if (option === 'date') {
			setTempDate(date);
		} else if (option === 'close') {
			onSelectDate(tempDate);
			closeModal();
		}
	};

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={closeModal}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Select date of birth</Text>

					<DateTimePicker
						value={tempDate}
						mode="date"
						display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
						onChange={(event, date) => handleChange(event, date, 'date')}
						maximumDate={maximumDate || new Date()}
						minimumDate={minimumDate}
						textColor="#000000"
					/>

					{Platform.OS === 'ios' && (
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => handleChange(null, null, 'close')}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					)}
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
		width: '90%',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#000',
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: CORAL_COLOR,
		padding: 15,
		borderRadius: 25,
		marginTop: 20,
		width: '100%',
		alignItems: 'center',
	},
	closeButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default CustomDatePicker;
