import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const authStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: 'black',
	},
	glassCard: {
		width: '90%',
		padding: 25,
		borderRadius: 20,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.3)',
		alignItems: 'center',
	},
	logo: {
		width: 200,
		height: 100,
		resizeMode: 'contain',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 12,
		color: 'white',
	},
	button: {
		backgroundColor: 'black',
		padding: 10,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
		borderRadius: 12,
		margin: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	backgroundImage: {
		flex: 1,
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const appStyles = StyleSheet.create({
	textBox: {
		height: 40,
		width: '75%',
		borderRadius: 12,
		borderWidth: 1,
		paddingLeft: 10,
		paddingRight: 10,
		margin: 10,
	},
});

export { authStyles, appStyles };
