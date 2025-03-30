import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon.js';
import CreateEventScreen from './CreateEvent.js';

const Home = () => {
	const insets = useSafeAreaInsets();
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
			}}
		>
			<Text>Home Screen</Text>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Icon.EntypoIcon name="new-message" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default Home;
