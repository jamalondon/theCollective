import { useRef } from 'react';
import { Animated } from 'react-native';

export const useCreateEventAnimations = () => {
	const progressAnim = useRef(new Animated.Value(0.25)).current;
	const errorShakeAnim = useRef(new Animated.Value(0)).current;
	const buttonScaleAnim = useRef(new Animated.Value(1)).current;

	const animateProgress = (currentStep) => {
		const toValue =
			currentStep === 1
				? 0.25
				: currentStep === 2
				? 0.5
				: currentStep === 3
				? 0.75
				: 1;

		Animated.timing(progressAnim, {
			toValue,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	const shakeError = () => {
		Animated.sequence([
			Animated.timing(errorShakeAnim, {
				toValue: 15,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(errorShakeAnim, {
				toValue: -15,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(errorShakeAnim, {
				toValue: 15,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(errorShakeAnim, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start();
	};

	const handleButtonPressIn = () => {
		Animated.spring(buttonScaleAnim, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleButtonPressOut = () => {
		Animated.spring(buttonScaleAnim, {
			toValue: 1,
			friction: 4,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	return {
		progressAnim,
		errorShakeAnim,
		buttonScaleAnim,
		animateProgress,
		shakeError,
		handleButtonPressIn,
		handleButtonPressOut,
	};
};
