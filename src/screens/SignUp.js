import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
} from 'react-native';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		// Implement login logic here
		console.log('Login pressed', email, password);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Sign Up</Text>
			</TouchableOpacity>
		</View>
	);
};
