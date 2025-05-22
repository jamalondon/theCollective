import React, { useState, useCallback, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
	Platform,
	KeyboardAvoidingView,
	Keyboard,
	Pressable,
	FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from '../components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/useAppTheme';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useSelector, useDispatch } from 'react-redux';
import {
	createPrayerRequest,
	getPrayerRequests,
} from '../store/prayerRequestThunk';

const MAX_CHARACTERS = 500;

const PrayerRequest = ({ navigation }) => {
	//state
	const [prayerText, setPrayerText] = useState('');
	const [images, setImages] = useState([]);
	const textInputRef = useRef(null);
	const scrollViewRef = useRef(null);

	//hooks
	const { appStyles, prayerRequestStyles, commonStyles } = useThemedStyles();
	const { colors } = useAppTheme();
	const { profilePicture } = useSelector((state) => state.user);
	const { error: errorRequest } = useSelector((state) => state.prayerRequests);
	const dispatch = useDispatch();

	// Safe area insets
	const insets = useSafeAreaInsets();

	const handleTextChange = (text) => {
		if (text.length <= MAX_CHARACTERS) {
			setPrayerText(text);
		}

		//trim the text if the user creates a new line past double line
		if (text.endsWith('\n\n\n')) {
			setPrayerText(text.slice(0, text.length - 1));
		}

		// Ensure the text input stays in view
		setTimeout(() => {
			scrollViewRef.current?.scrollToEnd({ animated: true });
		}, 100);
	};

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== 'granted') {
			alert('Sorry, we need camera roll permissions to upload images!');
			return;
		}

		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			console.log('Picker result:', result);

			if (!result.canceled && result.assets && result.assets[0]) {
				setImages([...images, result.assets[0].uri]);
			}
		} catch (error) {
			console.error('Error picking image:', error);
			alert('There was an error selecting the image. Please try again.');
		}
	};

	const removeImage = (index) => {
		const newImages = [...images];
		newImages.splice(index, 1);
		setImages(newImages);
	};

	const submitPrayerRequest = async () => {
		try {
			await dispatch(
				//submit the prayer request to the Redux store
				createPrayerRequest({
					text: prayerText,
					images,
				})
			);
			if (errorRequest) {
				throw new Error(errorRequest);
			}
			await dispatch(getPrayerRequests());
			// Reset form after submission
			setPrayerText('');
			setImages([]);
			Keyboard.dismiss();
			navigation.goBack();
		} catch (error) {
			Alert.alert('Error', error.message || 'Failed to submit prayer request');
		}
	};

	const handleScroll = () => {
		Keyboard.dismiss();
	};

	return (
		<View
			style={[
				prayerRequestStyles.container,
				{
					paddingTop: insets.top,
					paddingLeft: insets.left,
					paddingRight: insets.right,
					paddingBottom: insets.bottom,
				},
			]}
		>
			{/* Back Button */}
			<TouchableOpacity
				onPress={navigation.goBack}
				style={{
					marginLeft: 10,
					margin: 'auto',
				}}
			>
				<Icon.IoniconsIcon name="arrow-back" size={36} color={colors.primary} />
			</TouchableOpacity>

			<ScrollView
				style={prayerRequestStyles.scrollContainer}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				<Pressable onTouchStart={() => textInputRef.current?.focus()}>
					<View style={{ flexDirection: 'row' }}>
						<Image
							source={{ uri: profilePicture }}
							style={appStyles.avatarIcon}
						/>
						<TextInput
							ref={textInputRef}
							style={prayerRequestStyles.input}
							multiline
							placeholder="How can the Collective pray for you?"
							placeholderTextColor={'gray'}
							value={prayerText}
							onChangeText={handleTextChange}
							scrollEnabled={true}
							autoFocus={true}
							autoCorrect={true}
						/>
					</View>

					<Text style={prayerRequestStyles.characterCount}>
						{prayerText.length}/{MAX_CHARACTERS}
					</Text>
				</Pressable>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
			>
				{images.length > 0 && (
					<FlatList
						data={images}
						horizontal
						keyExtractor={(item, index) => item + index}
						style={prayerRequestStyles.imageContainer}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item, index }) => (
							<View style={prayerRequestStyles.imageWrapper}>
								<Image
									source={{ uri: item }}
									style={prayerRequestStyles.image}
								/>
								<TouchableOpacity
									style={prayerRequestStyles.removeImage}
									onPress={() => removeImage(index)}
								>
									<Icon.IoniconsIcon name="close" size={20} color="white" />
								</TouchableOpacity>
							</View>
						)}
					/>
				)}

				<View style={prayerRequestStyles.footer}>
					<TouchableOpacity
						style={prayerRequestStyles.imageButton}
						onPress={pickImage}
					>
						<Icon.IoniconsIcon name="image" size={24} color={colors.primary} />
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							prayerRequestStyles.submitButton,
							!prayerText.trim() &&
								images.length === 0 &&
								prayerRequestStyles.submitButtonDisabled,
						]}
						disabled={!prayerText.trim() && images.length === 0}
						onPress={submitPrayerRequest}
					>
						<Text style={prayerRequestStyles.submitButtonText}>
							Share Prayer Request
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default PrayerRequest;
