import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { authStyles } from '../../style.js';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
			style={authStyles.container}
		>
			<TextInput
				style={authStyles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={authStyles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TouchableOpacity
				style={authStyles.button}
				onPress={console.log('Sign In')}
			>
				<Text style={authStyles.buttonText}>Sign In</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};
