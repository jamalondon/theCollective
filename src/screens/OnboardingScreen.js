import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useThemedStyles } from '../hooks/useThemedStyles';
import GatherAnimation from '../components/GatherAnimation';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
	const [showWelcome, setShowWelcome] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));
	const navigation = useNavigation();
	const { splashStyles, welcomeStyles } = useThemedStyles();

	const handleAnimationComplete = () => {
		// Fade in the welcome content
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
		setShowWelcome(true);
	};

	const handleGetStarted = () => {
		navigation.navigate('Login');
	};

	return (
		<View style={styles.container}>
			{/* Logo and Dots Animation */}
			<View style={styles.animationContainer}>
				<Image
					source={require('../assets/images/logo.png')}
					style={styles.logo}
					resizeMode="contain"
				/>
				<GatherAnimation onAnimationComplete={handleAnimationComplete} />
			</View>

			{/* Welcome Content */}
			{showWelcome && (
				<Animated.View
					style={[
						styles.welcomeContent,
						{
							opacity: fadeAnim,
							transform: [
								{
									translateY: fadeAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [20, 0],
									}),
								},
							],
						},
					]}
				>
					<Text style={welcomeStyles.title}>Welcome to theCollective</Text>
					<Text style={welcomeStyles.subtitle}>
						Connect, Share, and Grow Together
					</Text>
					<Text style={welcomeStyles.description}>
						Join our community of like-minded individuals and discover new
						opportunities for collaboration and growth.
					</Text>
					<CustomButton
						title="Get Started"
						onPress={handleGetStarted}
						style={styles.button}
					/>
				</Animated.View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	animationContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 150,
		height: 150,
		position: 'absolute',
		zIndex: 1,
	},
	welcomeContent: {
		width: '100%',
		paddingHorizontal: 20,
		alignItems: 'center',
	},
	button: {
		marginTop: 30,
		width: '80%',
	},
});

export default OnboardingScreen;
