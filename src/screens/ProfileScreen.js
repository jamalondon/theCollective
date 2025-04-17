import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../store/userThunks';
import * as RootNavigation from '../navigation/navigationRef';
import { appStyles } from '../constants/style';
import ThemeToggle from '../components/ThemeToggle';
import { useAppTheme } from '../hooks/useAppTheme';
import Icon from '../components/Icon';

const Profile = () => {
	//used for safe area on the screen (notches, native UI elements, etc.)
	// This is not necessary for the profile screen, but is used in the other screens
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const { colors } = useAppTheme();

	//redux state selectors
	// These are the selectors for the user state in the redux store
	//Full state: {
	// "dateOfBirth": "05/12/1997",
	// "email": "b97@gmail.com",
	// "errorMessage": "",
	// "name": "Bryson London",
	// "preferences": {"darkMode": false, "notifications": true},
	// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2N2U1ZDMxMzQ2OTkzN2FkYjgzNTNlNmYiLCJpYXQiOjE3NDMxMTY4Njd9.k6qw8fBaDlI4RHWDwWWYVHS3FrCAfhIsIkgA8k5I9pQ", "userID": "67e5d313469937adb8353e6f"}
	const userName = useSelector((state) => state.user.name);
	const userEmail = useSelector((state) => state.user.email);

	const handleSignOut = async () => {
		await dispatch(signOutUser());
		RootNavigation.navigate('Auth');
	};

	return (
		<View
			style={[
				appStyles.profileContainer,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
					backgroundColor: colors.background,
				},
			]}
		>
			<View style={appStyles.profileInfo}>
				<Text style={[appStyles.profileName, { color: colors.text.primary }]}>
					{userName}
				</Text>
				<Text
					style={[appStyles.profileEmail, { color: colors.text.secondary }]}
				>
					{userEmail}
				</Text>
			</View>

			<View style={styles.settingsContainer}>
				<View style={styles.settingRow}>
					<View style={styles.settingLeft}>
						<Icon.IoniconsIcon
							name="moon-outline"
							size={24}
							color={colors.text.primary}
						/>
						<Text style={[styles.settingText, { color: colors.text.primary }]}>
							Dark Mode
						</Text>
					</View>
					<ThemeToggle />
				</View>
			</View>

			<TouchableOpacity style={appStyles.signOutButton} onPress={handleSignOut}>
				<Text style={appStyles.signOutText}>Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	settingsContainer: {
		padding: 16,
		width: '100%',
	},
	settingRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
	},
	settingLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	settingText: {
		fontSize: 16,
		fontWeight: '500',
	},
});

export default Profile;
