import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

const HorizontalLineSeperator = ({ text }) => {
	const { colors } = useAppTheme();

	return text ? (
		<View style={styles.container}>
			{horizontalLabelLine(colors.text.primary)}
			<Text style={[styles.text, { color: colors.text.primary }]}>{text}</Text>
			{horizontalLabelLine(colors.text.primary)}
		</View>
	) : (
		<View style={styles.container}>{horizontalLabelLine()}</View>
	);
};

const horizontalLabelLine = (color) => {
	return <View style={[styles.line, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
	line: {
		height: 2,
		flex: 1,
		borderRadius: 10,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	text: {
		fontSize: 15,
		color: 'gray',
		marginHorizontal: 10,
	},
});

export default HorizontalLineSeperator;
