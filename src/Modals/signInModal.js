import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../store/userThunks';
import { clearError } from '../store/userSlice';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useAppTheme } from '../hooks/useAppTheme';

const SignInModal = ({ visible, closeModal }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { authStyles, commonStyles } = useThemedStyles();
	const { colors } = useAppTheme();

	//redux state selectors
	const errorMessage = useSelector((state) => state.user.errorMessage);
	const token = useSelector((state) => state.user.token);

	//redux dispatch function
	const dispatch = useDispatch();

	// Close modal when user successfully signs in (token changes)
	useEffect(() => {
		if (token) {
			handleModalClose();
		}
	}, [token]);

	const handleSignIn = () => {
		// Implement sign in logic here
		dispatch(signInUser({ email, password }));
	};
	const handleModalClose = () => {
		setEmail('');
		setPassword('');
		closeModal();
	};

	const styles = StyleSheet.create({
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
		forgotPassword: {
			alignSelf: 'flex-end',
			marginBottom: 20,
		},
		forgotPasswordText: {
			color: '#1DA1F2',
			fontSize: 14,
		},
		signInButton: {
			backgroundColor: '#FF6B6B',
			borderRadius: 25,
			padding: 15,
			alignItems: 'center',
		},
		signInButtonDisabled: {
			backgroundColor: '#ccc',
		},
		signInButtonText: {
			color: 'white',
			fontSize: 16,
			fontWeight: '600',
		},
	});

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
								<Text style={styles.title}>Welcome Back! </Text>
							</View>

							<View style={styles.form}>
								<TextInput
									style={authStyles.input}
									placeholder="Email"
									value={email}
									onChangeText={setEmail}
									keyboardType="email-address"
									autoCapitalize="none"
									textContentType="username"
									autoComplete="email"
								/>

								<TextInput
									style={authStyles.input}
									placeholder="Password"
									value={password}
									onChangeText={setPassword}
									secureTextEntry
									textContentType="password"
									autoComplete="password"
								/>
								{errorMessage && (
									<Text style={commonStyles.errorText}>{errorMessage}</Text>
								)}

								<TouchableOpacity
									style={styles.forgotPassword}
									onPress={() => {
										/* Handle forgot password */
									}}
								>
									<Text style={styles.forgotPasswordText}>
										Forgot password?
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[
										styles.signInButton,
										(!email || !password) && styles.signInButtonDisabled,
									]}
									onPress={handleSignIn}
									disabled={!email || !password}
								>
									<Text style={styles.signInButtonText}>Sign in</Text>
								</TouchableOpacity>
							</View>
						</KeyboardAvoidingView>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default SignInModal;
