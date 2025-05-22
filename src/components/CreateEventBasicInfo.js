import React from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import TagSelector from './TagSelector';
import { useThemedStyles } from '../hooks/useThemedStyles';
import HorizontalSectionSeparator from './HorizontalSectionSeparator';

const CreateEventBasicInfo = ({
	eventTitle,
	setEventTitle,
	selectedTags,
	onTagPress,
	error,
	userName,
}) => {
	const { createEventStyles } = useThemedStyles();
	return (
		<>
			<Animated.View style={createEventStyles.inputContainer}>
				<TextInput
					style={[
						createEventStyles.input,
						error ? createEventStyles.inputError : null,
					]}
					value={eventTitle}
					onChangeText={setEventTitle}
					placeholder={`${userName}'s Event (default)`}
					placeholderTextColor="#999"
					maxLength={30}
				/>
			</Animated.View>

			<View style={createEventStyles.tagSection}>
				<Text style={createEventStyles.label}>Event Type</Text>
				<Text style={createEventStyles.tagHelper}>Select all that apply</Text>
				<TagSelector selectedTags={selectedTags} onTagPress={onTagPress} />
			</View>
		</>
	);
};

export default CreateEventBasicInfo;
