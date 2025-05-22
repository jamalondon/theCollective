import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Animated,
	ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../store/eventThunk';
import { clearSearchResults } from '../store/eventSlice';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../hooks/useThemedStyles';

const CreateEventDetailsAttendees = ({
	description,
	setDescription,
	attendees,
	setAttendees,
	error,
}) => {
	const { createEventStyles } = useThemedStyles();
	const [searchQuery, setSearchQuery] = useState('');

	const dispatch = useDispatch();
	const { searchResults, isLoading } = useSelector((state) => state.events);

	// Search function
	const handleSearchUsers = async (query) => {
		//validation
		if (query.length < 1) {
			dispatch(clearSearchResults());
			return;
		}
		try {
			// Call your API endpoint
			await dispatch(searchUsers(query));
		} catch (error) {
			console.error('Error searching users:', error);
		}
	};

	const removeAttendee = (userId) => {
		setAttendees(attendees.filter((attendee) => attendee.id !== userId));
	};

	return (
		<>
			<Animated.View style={createEventStyles.descriptionContainer}>
				<TextInput
					style={[
						createEventStyles.descriptionInput,
						error && !description ? createEventStyles.inputError : null,
					]}
					value={description}
					onChangeText={setDescription}
					placeholder="Additional details about the event..."
					placeholderTextColor="#999"
					multiline
					numberOfLines={4}
					textAlignVertical="top"
				/>
			</Animated.View>

			<View style={createEventStyles.attendeesSection}>
				<Text style={createEventStyles.label}>Invite Attendees</Text>
				<View style={createEventStyles.searchContainer}>
					<View style={createEventStyles.searchInputContainer}>
						<Ionicons
							name="search"
							size={20}
							color="#666"
							style={createEventStyles.searchIcon}
						/>
						<TextInput
							style={createEventStyles.searchInput}
							value={searchQuery}
							onChangeText={(text) => {
								handleSearchUsers(text);
								setSearchQuery(text);
							}}
							placeholder="Search for people"
							placeholderTextColor="#999"
						/>
						{searchQuery ? (
							<TouchableOpacity
								style={createEventStyles.clearButton}
								onPress={() => {
									setSearchQuery('');
									dispatch(clearSearchResults());
								}}
							>
								<Ionicons name="close-circle" size={20} color="#666" />
							</TouchableOpacity>
						) : null}
					</View>
				</View>

				{/* Selected Attendees */}
				{attendees.length > 0 && (
					<View style={createEventStyles.selectedAttendeesContainer}>
						<Text style={createEventStyles.subLabel}>Selected</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{attendees.map((attendee) => (
								<View key={attendee.id} style={createEventStyles.attendeeChip}>
									<View style={createEventStyles.attendeeAvatarPlaceholder}>
										<Text style={createEventStyles.avatarText}>
											{attendee.name[0]}
										</Text>
									</View>
									<Text style={createEventStyles.attendeeName}>
										{attendee.name}
									</Text>
									<TouchableOpacity
										onPress={() => removeAttendee(attendee.id)}
										style={createEventStyles.removeAttendeeButton}
									>
										<Ionicons name="close-circle" size={20} color="#666" />
									</TouchableOpacity>
								</View>
							))}
						</ScrollView>
					</View>
				)}

				{/* Search Results */}
				<View style={createEventStyles.suggestedUsersContainer}>
					<Text style={createEventStyles.subLabel}>
						{searchQuery ? 'Search Results' : 'Suggested'}
					</Text>
					{isLoading ? (
						<ActivityIndicator style={createEventStyles.loader} color="#666" />
					) : (
						searchResults
							.filter(
								(user) => !attendees.some((attendee) => attendee.id === user.id)
							)
							.map((user) => (
								<TouchableOpacity
									key={user.id}
									style={createEventStyles.userListItem}
									onPress={() => setAttendees([...attendees, user])}
								>
									<View style={createEventStyles.attendeeAvatarPlaceholder}>
										<Text style={createEventStyles.avatarText}>
											{user.name[0]}
										</Text>
									</View>
									<View style={createEventStyles.userInfo}>
										<Text style={createEventStyles.userName}>{user.name}</Text>
										<Text style={createEventStyles.userHandle}>
											{user.username}
										</Text>
									</View>
									<Ionicons name="add-circle-outline" size={24} color="#666" />
								</TouchableOpacity>
							))
					)}
				</View>
			</View>
		</>
	);
};

export default CreateEventDetailsAttendees;
