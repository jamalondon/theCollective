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

const tabBarStyles = StyleSheet.create({
	mainContainer: {
		position: 'relative',
		height: 80,
	},
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		height: 70,
		borderTopWidth: 1,
		borderTopColor: '#F0F0F0',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	tabButton: {
		flex: 1,
		alignItems: 'center',
	},
	tabItem: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconContainer: {
		padding: 8,
		borderRadius: 20,
	},
	activeIconContainer: {
		backgroundColor: '#F0F5FF',
	},
	tabText: {
		fontSize: 12,
		marginTop: 4,
	},
	activeTabText: {
		color: '#4169E1',
		fontWeight: '500',
	},
	inactiveTabText: {
		color: '#AAAAAA',
	},
	plusButton: {
		position: 'absolute',
		top: -30, // Move it up a bit more
		left: '50%',
		marginLeft: -35, // Half of the width to center it
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '#4169E1',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		zIndex: 10,
	},
});

export { authStyles, appStyles, tabBarStyles };
