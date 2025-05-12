import React from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import TagSelector from './TagSelector';
import { useThemedStyles } from '../hooks/useThemedStyles';

const CreateEventBasicInfo = ({
	eventTitle,
	setEventTitle,
	selectedTags,
	onTagPress,
	nameError,
	errorShakeAnim,
}) => {
	const { createEventStyles } = useThemedStyles();
	return (
		<>
			<Animated.View
				style={[
					createEventStyles.inputContainer,
					{ transform: [{ translateX: errorShakeAnim }] },
				]}
			>
				<Text style={createEventStyles.label}>Event Name</Text>
				<TextInput
					style={[
						createEventStyles.input,
						nameError ? createEventStyles.inputError : null,
					]}
					value={eventTitle}
					onChangeText={setEventTitle}
					placeholder="Enter event name"
					placeholderTextColor="#999"
					maxLength={30}
				/>
				{nameError ? (
					<Text style={createEventStyles.errorText}>{nameError}</Text>
				) : null}
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
