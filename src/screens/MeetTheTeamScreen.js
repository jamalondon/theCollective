import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemedStyles } from '../hooks/useThemedStyles';

const MeetTheTeam = () => {
	const insets = useSafeAreaInsets();
	const { appStyles } = useThemedStyles();

	return (
		<View
			style={[
				appStyles.container,
				{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}
		>
			<Text>Meet The Team</Text>
		</View>
	);
};

export default MeetTheTeam;
