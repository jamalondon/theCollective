import React, { useState, useEffect } from 'react';
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Platform,
} from 'react-native';
import WheelPickerCross from './WheelPickerCross';

const CORAL_COLOR = '#FF6B6B';

const CustomTimePicker = ({ visible, onClose, onSelectTime, selectedTime }) => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [period, setPeriod] = useState('AM');

	useEffect(() => {
		if (selectedTime) {
			const date = new Date(selectedTime);
			let hours = date.getHours();
			const minutes = date.getMinutes();
			const period = hours >= 12 ? 'PM' : 'AM';

			// Convert to 12-hour format
			hours = hours % 12;
			hours = hours ? hours : 12; // Convert 0 to 12

			setHours(hours - 1); // Adjust for 0-based index
			setMinutes(Math.floor(minutes / 5)); // Adjust for 5-minute intervals
			setPeriod(period);
		}
	}, [selectedTime]);

	const hoursArray = Array.from({ length: 12 }, (_, i) =>
		(i + 1).toString().padStart(2, '0')
	);
	const minutesArray = Array.from({ length: 12 }, (_, i) =>
		(i * 5).toString().padStart(2, '0')
	);
	const periodArray = ['AM', 'PM'];

	const handleConfirm = () => {
		const now = new Date();
		let selectedHours = parseInt(hoursArray[hours]);
		if (period === 'PM' && selectedHours !== 12) selectedHours += 12;
		if (period === 'AM' && selectedHours === 12) selectedHours = 0;

		const selectedMinutes = parseInt(minutesArray[minutes]);

		const selectedDate = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			selectedHours,
			selectedMinutes
		);
		onSelectTime(selectedDate);
	};

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Select Time</Text>

					<View style={styles.pickerContainer}>
						<View style={styles.wheelContainer}>
							<WheelPickerCross
								selectedItem={hours}
								data={hoursArray}
								onItemSelected={setHours}
								style={styles.wheel}
							/>
							<Text style={styles.pickerLabel}>Hour</Text>
						</View>

						<View style={styles.wheelContainer}>
							<WheelPickerCross
								selectedItem={minutes}
								data={minutesArray}
								onItemSelected={setMinutes}
								style={styles.wheel}
							/>
							<Text style={styles.pickerLabel}>Min</Text>
						</View>

						<View style={styles.wheelContainer}>
							<WheelPickerCross
								selectedItem={periodArray.indexOf(period)}
								data={periodArray}
								onItemSelected={(index) => setPeriod(periodArray[index])}
								style={styles.wheel}
							/>
							<Text style={styles.pickerLabel}>AM/PM</Text>
						</View>
					</View>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onClose}
						>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.confirmButton]}
							onPress={() => {
								handleConfirm();
								onClose();
							}}
						>
							<Text style={styles.confirmButtonText}>Confirm</Text>
						</TouchableOpacity>
					</View>
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
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		color: '#333',
		marginBottom: 20,
		textAlign: 'center',
	},
	pickerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
		width: '100%',
		paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,
	},
	wheelContainer: {
		alignItems: 'center',
		flex: 1,
	},
	wheel: {
		width: Platform.OS === 'ios' ? '100%' : 70,
		height: Platform.OS === 'ios' ? 150 : 200,
	},
	pickerLabel: {
		marginTop: 8,
		fontSize: 14,
		color: '#666',
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
		marginTop: Platform.OS === 'ios' ? 0 : 20,
	},
	button: {
		borderRadius: 10,
		padding: 15,
		width: '45%',
		alignItems: 'center',
	},
	cancelButton: {
		backgroundColor: '#f1f1f1',
	},
	confirmButton: {
		backgroundColor: CORAL_COLOR,
	},
	cancelButtonText: {
		color: '#666',
		fontSize: 16,
		fontWeight: '600',
	},
	confirmButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default CustomTimePicker;
