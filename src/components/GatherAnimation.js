import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useThemedStyles } from '../hooks/useThemedStyles';

const { width, height } = Dimensions.get('window');
const NUM_DOTS = 50; // Number of dots in the animation
const DOT_SIZE = 6;
const ANIMATION_DURATION = 10000; // 10 seconds
const CIRCLE_RADIUS = 150; // Radius for the circle formation

const generateRandomPosition = () => {
	const angle = Math.random() * 2 * Math.PI;
	const radius = Math.random() * Math.min(width, height) * 0.8; // Random distance from center
	return {
		x: width / 2 + radius * Math.cos(angle),
		y: height / 2 + radius * Math.sin(angle),
	};
};

const GatherAnimation = ({ onAnimationComplete }) => {
	const [dots] = useState(() =>
		Array.from({ length: NUM_DOTS }, () => ({
			position: new Animated.ValueXY(generateRandomPosition()),
			opacity: new Animated.Value(0),
			scale: new Animated.Value(0),
		}))
	);
	const { splashStyles } = useThemedStyles();

	useEffect(() => {
		// Create animations for each dot
		const animations = dots.map((dot, index) => {
			const delay = (index / NUM_DOTS) * 2000; // Stagger the start of each dot's animation

			const targetPosition = {
				x:
					width / 2 +
					Math.cos(index * ((2 * Math.PI) / NUM_DOTS)) * CIRCLE_RADIUS,
				y:
					height / 2 +
					Math.sin(index * ((2 * Math.PI) / NUM_DOTS)) * CIRCLE_RADIUS,
			};

			return Animated.parallel([
				// Fade in
				Animated.sequence([
					Animated.delay(delay),
					Animated.timing(dot.opacity, {
						toValue: 1,
						duration: 1000,
						useNativeDriver: true,
					}),
				]),
				// Scale up
				Animated.sequence([
					Animated.delay(delay),
					Animated.spring(dot.scale, {
						toValue: 1,
						friction: 4,
						useNativeDriver: true,
					}),
				]),
				// Move to circle formation
				Animated.sequence([
					Animated.delay(delay + 1000),
					Animated.timing(dot.position, {
						toValue: targetPosition,
						duration: ANIMATION_DURATION - delay - 1000,
						useNativeDriver: true,
					}),
				]),
			]);
		});

		// Start all animations and call onAnimationComplete when done
		Animated.parallel(animations).start(() => {
			if (onAnimationComplete) {
				onAnimationComplete();
			}
		});
	}, []);

	return (
		<View style={splashStyles.container}>
			{dots.map((dot, index) => (
				<Animated.View
					key={index}
					style={[
						splashStyles.dot,
						{
							opacity: dot.opacity,
							transform: [
								...dot.position.getTranslateTransform(),
								{ scale: dot.scale },
							],
						},
					]}
				/>
			))}
		</View>
	);
};

export default GatherAnimation;
