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
import { authStyles } from '../../style.js';
import useNavigation from '../hooks/useNavigation.js';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../store/userThunks.js';

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const navHookFunctions = useNavigation({ navigation });
	const dispatch = useDispatch();

	const handleLogin = () => {
		let name = `${firstName} ${lastName}`;
		dispatch(signUpUser({ email, password, name, dateOfBirth: '05/12/1997' }));
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
						style={authStyles.input}
						placeholder="First Name"
						placeholderTextColor="white"
						value={firstName}
						onChangeText={setFirstName}
						autoCapitalize="none"
					/>
					<TextInput
						style={authStyles.input}
						placeholder="Last Name"
						placeholderTextColor="white"
						value={lastName}
						onChangeText={setLastName}
						autoCapitalize="none"
					/>
					<TextInput
						style={authStyles.input}
						placeholder="Email"
						placeholderTextColor="white"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<TextInput
						style={authStyles.input}
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
						onPress={() => navHookFunctions.clearNavigation('SignIn')}
					>
						<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
							Already a member? Sign In
						</Text>
					</TouchableOpacity>
				</BlurView>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

export default SignUp;
