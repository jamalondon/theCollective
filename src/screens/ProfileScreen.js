import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Profile = () => {
	//used for safe area on the screen (notches, native UI elements, etc.)
	// This is not necessary for the profile screen, but is used in the other screens
	const insets = useSafeAreaInsets();

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

	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
			}}
		>
			<Text>{userName}</Text>
			<Text>{userEmail}</Text>
		</View>
	);
};

export default Profile;
