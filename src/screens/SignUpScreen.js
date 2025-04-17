import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
	KeyboardAvoidingView,
	Platform,
	ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { authStyles } from '../constants/style.js';
import * as RootNavigation from '../navigation/navigationRef.js';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../store/userThunks.js';
import { clearError } from '../store/userSlice.js';

const SignUp = ({ navigation }) => {
	//state variables for the email, password, first name, and last name
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [validationError, setValidationError] = useState('');

	//redux state selectors
	const errorMessage = useSelector((state) => state.user.errorMessage);

	//redux dispatch function
	const dispatch = useDispatch();

	//called when the submit button is pressed
	const handleLogin = () => {
		// Clear previous errors
		dispatch(clearError());

		// Validate inputs
		if (!firstName.trim() || !lastName.trim()) {
			setErrorMessage('First name and last name are required');
			return;
		}
		if (!email.trim()) {
			setErrorMessage('Email is required');
			return;
		}
		if (!password.trim()) {
			setErrorMessage('Password is required');
			return;
		}
		if (password.length < 6) {
			setErrorMessage('Password must be at least 6 characters long');
			return;
		}

		let name = `${firstName.trim()} ${lastName.trim()}`;
		dispatch(
			signUpUser({
				email: email.trim(),
				password,
				name,
				dateOfBirth: '1997-05-12',
			})
		);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
			style={authStyles.container}
		>
			<ImageBackground
				source={require('../data/images/image1.jpg')}
				style={authStyles.backgroundImage}
				resizeMode="fit"
			>
				<BlurView intensity={90} tint="dark" style={authStyles.glassCard}>
					<Text style={{ color: 'white', fontSize: 40 }}>theCollective</Text>
					<TextInput
						style={[
							authStyles.input,
							validationError && firstName.length === 0 && styles.inputError,
						]}
						placeholder="First Name"
						placeholderTextColor="white"
						value={firstName}
						onChangeText={setFirstName}
						autoCapitalize="words"
					/>
					<TextInput
						style={[
							authStyles.input,
							validationError && lastName.length === 0 && styles.inputError,
						]}
						placeholder="Last Name"
						placeholderTextColor="white"
						value={lastName}
						onChangeText={setLastName}
						autoCapitalize="words"
					/>
					<TextInput
						style={[
							authStyles.input,
							validationError && email.length === 0 && styles.inputError,
						]}
						placeholder="Email"
						placeholderTextColor="white"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<TextInput
						style={[
							authStyles.input,
							validationError && password.length === 0 && styles.inputError,
						]}
						placeholder="Password"
						placeholderTextColor="white"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
					<TouchableOpacity
						style={authStyles.button}
						onPress={() => {
							handleLogin();
						}}
					>
						<Text style={authStyles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							dispatch(clearError());
							RootNavigation.navigate('SignIn');
						}}
					>
						<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
							Already a member? Sign In
						</Text>
					</TouchableOpacity>
					{errorMessage ? (
						<Text style={styles.errorText}>{errorMessage}</Text>
					) : errorMessage ? (
						<Text style={styles.errorText}>{errorMessage}</Text>
					) : null}
				</BlurView>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	inputError: {
		borderColor: 'red',
		borderWidth: 1,
	},
	errorText: {
		color: 'red',
		marginTop: 10,
		textAlign: 'center',
	},
});

export default SignUp;
