import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { COLORS, SPACING, FONTS } from './theme';
const { width, height } = Dimensions.get('window');

// Common styles that can be shared across components
const commonStyles = StyleSheet.create({
	input: {
		backgroundColor: COLORS.background,
		borderRadius: SPACING.md,
		padding: SPACING.md,
		borderWidth: 1,
		borderColor: COLORS.border.default,
		fontSize: FONTS.sizes.md,
		color: COLORS.text.primary,
	},
	shadowEffect: {
		shadowColor: COLORS.shadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	button: {
		padding: SPACING.md,
		borderRadius: SPACING.md,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		fontSize: FONTS.sizes.sm,
		marginBottom: SPACING.xs,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.text.primary,
		letterSpacing: 0.3,
	},
});

const authStyles = StyleSheet.create({
	container: {
		...commonStyles.container,
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
		...commonStyles.input,
		width: '100%',
		height: 40,
		marginBottom: 10,
		color: 'white',
	},
	button: {
		...commonStyles.button,
		backgroundColor: 'black',
		width: '100%',
		margin: 5,
	},
	buttonText: {
		...commonStyles.buttonText,
		color: 'white',
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
		...commonStyles.input,
		height: 40,
		width: '75%',
		margin: 10,
	},
	// Profile Screen Styles
	profileContainer: {
		...commonStyles.container,
	},
	profileInfo: {
		padding: 20,
		alignItems: 'center',
	},
	profileName: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	profileEmail: {
		fontSize: 16,
		color: '#666',
	},
	signOutButton: {
		...commonStyles.button,
		backgroundColor: '#ff3b30',
		marginHorizontal: 20,
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 0,
		marginBottom: 200,
	},
	signOutText: {
		...commonStyles.buttonText,
		color: 'white',
	},
});

const tabBarStyles = StyleSheet.create({
	mainContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 95,
		backgroundColor: 'transparent',
	},
	container: {
		...commonStyles.flexRow,
		backgroundColor: 'white',
		marginHorizontal: 20,
		marginBottom: 35,
		borderRadius: 25,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 70,
		justifyContent: 'space-around',
		paddingHorizontal: 10,
		...commonStyles.shadowEffect,
	},
	tabButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		paddingBottom: 8,
	},
	tabItem: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	iconContainer: {
		padding: 6,
		borderRadius: 20,
		marginBottom: 2,
	},
	activeIconContainer: {
		backgroundColor: '#F0F5FF',
	},
	tabText: {
		fontSize: 11,
		fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
		letterSpacing: 0.2,
		textAlign: 'center',
		includeFontPadding: false,
		marginTop: 2,
	},
	activeTabText: {
		color: '#4169E1',
		fontWeight: '600',
	},
	inactiveTabText: {
		color: '#94A3B8',
	},
	plusButton: {
		position: 'absolute',
		top: -28,
		left: '50%',
		marginLeft: -28,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#4169E1',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 8,
		zIndex: 1000,
	},
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'transparent',
	},
	fabButton: {
		position: 'absolute',
		alignItems: 'center',
		left: '50%',
		marginLeft: -70, // Half of the total width (140)
	},
	subButton: {
		backgroundColor: '#4169E1',
		width: 140,
		height: 48,
		borderRadius: 24,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		gap: 8,
	},
	subButtonText: {
		color: 'white',
		fontSize: 14,
		fontWeight: '600',
	},
});

const createEventStyles = StyleSheet.create({
	mainContainer: {
		...commonStyles.container,
	},
	flex: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	progressContainer: {
		marginTop: SPACING.xl,
		marginBottom: SPACING.xxxl,
	},
	progressBar: {
		height: 4,
		backgroundColor: COLORS.border.light,
		borderRadius: 2,
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		backgroundColor: COLORS.primary,
		borderRadius: 2,
	},
	stepText: {
		color: COLORS.text.secondary,
		fontSize: FONTS.sizes.sm,
		marginTop: SPACING.sm,
		textAlign: 'center',
	},
	mainContent: {
		flex: 1,
	},
	title: {
		fontSize: FONTS.sizes.xxl,
		fontWeight: FONTS.weights.bold,
		color: COLORS.text.primary,
		marginBottom: SPACING.sm,
	},
	subtitle: {
		fontSize: FONTS.sizes.lg,
		color: COLORS.text.secondary,
		marginBottom: SPACING.xxxl,
	},
	inputContainer: {
		marginBottom: SPACING.xxl,
	},
	label: {
		...commonStyles.label,
	},
	input: {
		...commonStyles.input,
		...commonStyles.shadowEffect,
	},
	inputError: {
		borderColor: COLORS.primary,
		borderWidth: 2,
	},
	errorText: {
		color: COLORS.primary,
		fontSize: FONTS.sizes.sm,
		marginTop: SPACING.sm,
	},
	tagSection: {
		marginTop: SPACING.xxl,
	},
	tagHelper: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.text.secondary,
		marginBottom: SPACING.md,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: SPACING.xl,
		gap: SPACING.md,
	},
	backButton: {
		flex: 1,
		paddingVertical: SPACING.lg,
		borderRadius: SPACING.md,
		borderWidth: 1,
		borderColor: COLORS.border.input,
		alignItems: 'center',
		justifyContent: 'center',
	},
	backButtonText: {
		color: COLORS.text.primary,
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
	},
	nextButtonContainer: {
		flex: 1,
	},
	nextButton: {
		flex: 1,
		backgroundColor: COLORS.primary,
		paddingVertical: SPACING.lg,
		borderRadius: SPACING.md,
		alignItems: 'center',
		justifyContent: 'center',
	},
	nextButtonText: {
		color: '#FFFFFF',
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
	},
	searchContainer: {
		marginBottom: SPACING.xxl,
	},
	searchInputContainer: {
		...commonStyles.flexRow,
		...commonStyles.input,
		...commonStyles.shadowEffect,
		paddingHorizontal: SPACING.md,
	},
	searchIcon: {
		marginRight: SPACING.sm,
	},
	searchInput: {
		flex: 1,
		paddingVertical: SPACING.md,
		fontSize: FONTS.sizes.md,
		color: COLORS.text.primary,
	},
	clearButton: {
		padding: SPACING.xs,
	},
	locationSection: {
		marginBottom: SPACING.xxl,
	},
	currentLocationContainer: {
		...commonStyles.flexRow,
		...commonStyles.shadowEffect,
		backgroundColor: COLORS.background,
		borderRadius: SPACING.md,
		padding: SPACING.lg,
		marginBottom: SPACING.xxl,
	},
	locationIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: COLORS.border.light,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: SPACING.md,
	},
	locationTextContainer: {
		flex: 1,
	},
	locationTitle: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.text.primary,
		marginBottom: 2,
	},
	locationSubtitle: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.text.secondary,
	},
	useButton: {
		backgroundColor: COLORS.primary,
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.sm,
		borderRadius: SPACING.sm,
	},
	useButtonText: {
		color: COLORS.background,
		fontSize: FONTS.sizes.sm,
		fontWeight: FONTS.weights.semibold,
	},
	sectionTitle: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.text.primary,
		marginBottom: SPACING.md,
	},
	popularLocationItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: SPACING.md,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border.light,
	},
	dateTimeSection: {
		marginBottom: SPACING.xxl,
	},
	dateTimeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.background,
		borderRadius: SPACING.md,
		padding: SPACING.lg,
		marginBottom: SPACING.md,
		shadowColor: COLORS.shadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	dateTimeText: {
		fontSize: FONTS.sizes.md,
		color: COLORS.text.primary,
		marginLeft: SPACING.md,
	},
	// Description styles
	descriptionContainer: {
		marginBottom: 24,
	},
	descriptionInput: {
		height: 120,
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		fontSize: 16,
		color: '#333',
		borderWidth: 1,
		borderColor: '#E5E5E5',
		marginTop: 8,
	},
	// Attendees section styles
	attendeesSection: {
		marginTop: 24,
	},
	selectedAttendeesContainer: {
		marginTop: 16,
		marginBottom: 24,
	},
	attendeeChip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginRight: 8,
		borderWidth: 1,
		borderColor: '#E5E5E5',
	},
	attendeeAvatarPlaceholder: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#F0F0F0',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	avatarText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#666',
	},
	attendeeName: {
		fontSize: 14,
		color: '#333',
		marginRight: 8,
	},
	removeAttendeeButton: {
		padding: 4,
	},
	suggestedUsersContainer: {
		marginTop: 16,
	},
	userListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		backgroundColor: '#fff',
		borderRadius: 12,
		marginBottom: 8,
		borderWidth: 1,
		borderColor: '#E5E5E5',
	},
	userInfo: {
		flex: 1,
		marginLeft: 12,
	},
	userName: {
		fontSize: 16,
		color: '#333',
		fontWeight: '500',
	},
	userHandle: {
		fontSize: 14,
		color: '#666',
		marginTop: 2,
	},
	subLabel: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
		fontWeight: '500',
	},
	createButton: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
});

export { commonStyles, authStyles, appStyles, tabBarStyles, createEventStyles };
