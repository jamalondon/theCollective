import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../store/userThunks.js';
import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	ScrollView,
} from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { useThemedStyles } from '../hooks/useThemedStyles';
import useFormatDate from '../hooks/useFormatDate';

const SignUpModal = ({ visible, closeModal }) => {
	const dispatch = useDispatch();
	const formatDate = useFormatDate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { authStyles } = useThemedStyles();
	//set minimum date to 18 years ago
	const minimumDate = new Date();
	const maximumDate = new Date();
	maximumDate.setFullYear(maximumDate.getFullYear() - 18);
	minimumDate.setFullYear(minimumDate.getFullYear() - 29);

	const token = useSelector((state) => state.user.token);

	useEffect(() => {
		if (token) {
			handleModalClose();
		}
	}, [token]);

	const handleSignUp = async () => {
		try {
			await dispatch(
				signUpUser({
					name,
					email,
					password,
					dateOfBirth: formatDate(dateOfBirth, 'ISO'),
				})
			);
		} catch (error) {
			console.error('Sign up failed:', error);
			// You might want to add error handling UI here
		}
	};
	const handleModalClose = () => {
		setEmail('');
		setName('');
		setPassword('');
		setDateOfBirth(null);
		setConfirmPassword('');
		closeModal();
	};

	const isFormValid = () => {
		return (
			name.length > 0 &&
			email.length > 0 &&
			password.length >= 8 &&
			password === confirmPassword &&
			dateOfBirth !== null
		);
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={closeModal}
		>
			<TouchableWithoutFeedback onPress={closeModal}>
				<View style={authStyles.modalOverlay}>
					<TouchableWithoutFeedback>
						<KeyboardAvoidingView
							behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
							style={authStyles.modalContent}
						>
							<View style={styles.header}>
								<TouchableOpacity
									onPress={handleModalClose}
									style={styles.closeButton}
								>
									<Text style={styles.closeButtonText}>✕</Text>
								</TouchableOpacity>
								<Text style={styles.title}>Create account</Text>
							</View>

							<ScrollView style={styles.form}>
								<TextInput
									style={authStyles.input}
									placeholder="Name"
									placeholderTextColor={'#999'}
									value={name}
									onChangeText={setName}
									autoCapitalize="words"
									textContentType="name"
									autoComplete="name"
								/>

								<TextInput
									style={authStyles.input}
									placeholder="Email"
									placeholderTextColor={'#999'}
									value={email}
									onChangeText={setEmail}
									keyboardType="email-address"
									autoCapitalize="none"
									textContentType="username"
									autoComplete="email"
								/>

								<TouchableOpacity
									style={authStyles.input}
									onPress={() => setShowDatePicker(true)}
								>
									<Text
										style={{
											fontSize: 16,
											color: dateOfBirth ? '#333333' : '#999',
										}}
									>
										{dateOfBirth ? formatDate(dateOfBirth) : 'Date of Birth'}
									</Text>
								</TouchableOpacity>

								<TextInput
									style={authStyles.input}
									placeholder="Password"
									placeholderTextColor={'#999'}
									value={password}
									onChangeText={setPassword}
									secureTextEntry
									textContentType="newPassword"
									autoComplete="password-new"
								/>

								<TextInput
									style={authStyles.input}
									placeholder="Confirm Password"
									placeholderTextColor={'#999'}
									value={confirmPassword}
									onChangeText={setConfirmPassword}
									secureTextEntry
									textContentType="newPassword"
									autoComplete="password-new"
								/>

								{password.length > 0 && password.length < 8 && (
									<Text style={styles.errorText}>
										Password must be at least 8 characters
									</Text>
								)}

								{confirmPassword.length > 0 && password !== confirmPassword && (
									<Text style={styles.errorText}>Passwords do not match</Text>
								)}

								<TouchableOpacity
									style={[
										authStyles.button,
										!isFormValid() && authStyles.buttonDisabled,
									]}
									onPress={handleSignUp}
									disabled={!isFormValid()}
								>
									<Text style={styles.signUpButtonText}>Sign up</Text>
								</TouchableOpacity>

								<Text style={authStyles.termsText}>
									By signing up, you agree to our{' '}
									<Text style={authStyles.link}>Terms</Text>,{' '}
									<Text style={authStyles.link}>Privacy Policy</Text>, and{' '}
									<Text style={authStyles.link}>Cookie Use</Text>.
								</Text>
							</ScrollView>

							<CustomDatePicker
								visible={showDatePicker}
								closeModal={() => setShowDatePicker(false)}
								onSelectDate={(date) => {
									setDateOfBirth(date);
								}}
								selectedDate={dateOfBirth}
								minimumDate={minimumDate}
								maximumDate={maximumDate}
							/>
						</KeyboardAvoidingView>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#eee',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 20,
		paddingBottom: 40,
		minHeight: '70%',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	closeButton: {
		padding: 10,
	},
	closeButtonText: {
		fontSize: 20,
		color: '#000',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 20,
	},
	form: {
		marginTop: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 15,
		marginBottom: 15,
		fontSize: 16,
	},
	dateInput: {
		justifyContent: 'center',
		backgroundColor: 'transparent',
		paddingVertical: 15,
	},
	dateText: {
		fontSize: 16,
		color: '#999',
	},
	placeholderText: {
		fontSize: 16,
		color: '#999',
	},
	errorText: {
		color: '#FF3B30',
		fontSize: 14,
		marginBottom: 15,
	},
	signUpButton: {
		backgroundColor: '#000',
		borderRadius: 25,
		padding: 15,
		alignItems: 'center',
		marginTop: 10,
	},
	signUpButtonDisabled: {
		backgroundColor: '#ccc',
	},
	signUpButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	termsText: {
		color: '#666',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 20,
		lineHeight: 20,
	},
	link: {
		color: '#1DA1F2',
		fontWeight: '500',
	},
});

export default SignUpModal;
