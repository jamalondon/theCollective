import React, { useRef } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Animated,
} from 'react-native';

const CORAL_COLOR = '#FF6B6B';

const AVAILABLE_TAGS = [
	{ id: 'bible-study', label: 'Bible Study' },
	{ id: 'worship', label: 'Worship' },
	{ id: 'communion', label: 'Communion' },
	{ id: 'hang-out', label: 'Hang-Out' },
	{ id: 'workout', label: 'Workout' },
];

const AnimatedTag = ({ tag, isSelected, onPress }) => {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			friction: 4,
			tension: 8,
			useNativeDriver: true,
		}).start();
	};

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View
				style={[
					styles.tag,
					isSelected && styles.tagSelected,
					{ transform: [{ scale: scaleAnim }] },
				]}
			>
				<Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
					{tag.label}
				</Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

const TagSelector = ({ selectedTags, onTagPress }) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{AVAILABLE_TAGS.map((tag) => (
				<AnimatedTag
					key={tag.id}
					tag={tag}
					isSelected={selectedTags.includes(tag.id)}
					onPress={() => onTagPress(tag.id)}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 5,
		marginHorizontal: 10,
	},
	tag: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 25,
		backgroundColor: '#f8f9fa',
		marginHorizontal: 5,
		borderWidth: 1,
		borderColor: '#e9ecef',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	tagSelected: {
		backgroundColor: CORAL_COLOR,
		borderColor: CORAL_COLOR,
		shadowColor: CORAL_COLOR,
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 4,
	},
	tagText: {
		fontSize: 16,
		color: '#495057',
		fontWeight: '500',
	},
	tagTextSelected: {
		color: '#ffffff',
	},
});

export default TagSelector;
