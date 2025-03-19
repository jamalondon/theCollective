import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { authStyles } from '../../style.js';
import useNavigation from '../hooks/useNavigation.js';

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navHookFunctions = useNavigation({ navigation });

	//for button presses
	const handleLogin = () => {};

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
							return 0;
						}}
					>
						<Text style={authStyles.buttonText}>Sign In</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navHookFunctions.clearNavigation('SignUp')}
					>
						<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
							New Member? Sign Up
						</Text>
					</TouchableOpacity>
				</BlurView>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
