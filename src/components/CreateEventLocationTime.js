import React, { useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Animated,
	ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createEventStyles } from '../constants/style';
import { searchLocations } from '../store/eventThunk';
import debounce from 'lodash/debounce';

const CreateEventLocationTime = ({
	searchQuery,
	setSearchQuery,
	eventLocation,
	setEventLocation,
	eventDate,
	onDatePress,
	onTimePress,
	popularLocations,
	errorShakeAnim,
	nameError,
}) => {
	const dispatch = useDispatch();
	const { searchResults, loading } = useSelector((state) => state.events);

	// Debounced search function
	const debouncedSearch = debounce((query) => {
		if (query.trim()) {
			dispatch(searchLocations(query));
		}
	}, 500);

	useEffect(() => {
		debouncedSearch(searchQuery);
		return () => debouncedSearch.cancel();
	}, [searchQuery]);

	const handleLocationSelect = (location) => {
		setEventLocation(location.name);
		setSearchQuery('');
	};

	return (
		<>
			{/* Search Container */}
			<Animated.View
				style={[
					createEventStyles.searchContainer,
					{ transform: [{ translateX: errorShakeAnim }] },
				]}
			>
				<View style={createEventStyles.searchInputContainer}>
					<Ionicons
						name="search"
						size={20}
						color="#666"
						style={createEventStyles.searchIcon}
					/>
					<TextInput
						style={[
							createEventStyles.searchInput,
							nameError ? createEventStyles.inputError : null,
						]}
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Search for a location"
						placeholderTextColor="#999"
					/>
					{searchQuery ? (
						<TouchableOpacity
							style={createEventStyles.clearButton}
							onPress={() => setSearchQuery('')}
						>
							<Ionicons name="close-circle" size={20} color="#666" />
						</TouchableOpacity>
					) : null}
				</View>
				{nameError ? (
					<Text style={createEventStyles.errorText}>{nameError}</Text>
				) : null}
			</Animated.View>

			{/* Search Results */}
			{loading ? (
				<ActivityIndicator style={createEventStyles.loader} color="#666" />
			) : searchQuery && searchResults?.length > 0 ? (
				<View style={createEventStyles.searchResults}>
					{searchResults.map((location) => (
						<TouchableOpacity
							key={location.id}
							style={createEventStyles.locationItem}
							onPress={() => handleLocationSelect(location)}
						>
							<View style={createEventStyles.locationTextContainer}>
								<Text style={createEventStyles.locationTitle}>
									{location.name}
								</Text>
								{location.subtitle && (
									<Text style={createEventStyles.locationSubtitle}>
										{location.subtitle}
									</Text>
								)}
							</View>
						</TouchableOpacity>
					))}
				</View>
			) : null}

			{/* Location Section */}
			{!searchQuery && (
				<>
					<View style={createEventStyles.currentLocationContainer}>
						<View style={createEventStyles.locationIconContainer}>
							<Ionicons name="location" size={30} color="#666" />
						</View>
						<View style={createEventStyles.locationTextContainer}>
							<Text style={createEventStyles.locationTitle}>
								Current Location
							</Text>
						</View>
						<TouchableOpacity style={createEventStyles.useButton}>
							<Text style={createEventStyles.useButtonText}>Use</Text>
						</TouchableOpacity>
					</View>

					<Text style={createEventStyles.sectionTitle}>Popular Locations</Text>
					{popularLocations.map((location) => (
						<TouchableOpacity
							key={location.id}
							style={createEventStyles.popularLocationItem}
							onPress={() => handleLocationSelect(location)}
						>
							<View style={createEventStyles.locationTextContainer}>
								<Text style={createEventStyles.locationTitle}>
									{location.name}
								</Text>
								<Text style={createEventStyles.locationSubtitle}>
									{location.subtitle}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</>
			)}

			{/* Date & Time Section */}
			<View style={createEventStyles.dateTimeSection}>
				<Text style={createEventStyles.sectionTitle}>Date & Time</Text>
				<TouchableOpacity
					style={createEventStyles.dateTimeButton}
					onPress={onDatePress}
				>
					<Ionicons name="calendar" size={24} color="#666" />
					<Text style={createEventStyles.dateTimeText}>
						{eventDate.toLocaleDateString()}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={createEventStyles.dateTimeButton}
					onPress={onTimePress}
				>
					<Ionicons name="time" size={24} color="#666" />
					<Text style={createEventStyles.dateTimeText}>
						{eventDate.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default CreateEventLocationTime;
