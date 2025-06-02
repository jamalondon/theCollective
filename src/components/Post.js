//import basic components
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useThemedStyles } from '../hooks/useThemedStyles';

const Post = ({ item }) => {
	const { postStyles } = useThemedStyles();
	return (
		<TouchableOpacity style={postStyles.container}>
			{/*Header*/}
			<View style={postStyles.headerContainer}>
				<Image
					source={{
						uri: item.owner.profile_picture,
					}}
					style={{ width: 50, height: 50, borderRadius: 25 }}
				/>
				<Text style={postStyles.headerText}>{item.owner.name}</Text>
			</View>

			<Text style={postStyles.titleText}>{item.title}</Text>
			<Text style={postStyles.text}>
				{item.description || item.text || null}
			</Text>

			{/*Tags*/}
			<View style={postStyles.tagsContainer}>
				{item.tags.map((tag, index) => (
					<Text key={index} style={postStyles.tag}>
						{tag}
					</Text>
				))}
			</View>
		</TouchableOpacity>
	);
};

export default Post;
