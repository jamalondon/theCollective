import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { SPACING, FONTS } from './theme';
const { width, height } = Dimensions.get('window');
const DOT_SIZE = 6;

// Create styles factory function that takes colors as parameter
export const createStyles = (colors) => {
	// Common styles that can be shared across components
	const commonStyles = StyleSheet.create({
		input: {
			backgroundColor: colors.background,
			borderRadius: SPACING.md,
			padding: SPACING.md,
			borderWidth: 1,
			borderColor: colors.border.default,
			fontSize: FONTS.sizes.md,
			color: colors.text.primary,
			width: '100%',
		},
		shadowEffect: {
			shadowColor: colors.shadow,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 10,
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
		errorText: {
			color: colors.primary,
			fontSize: FONTS.sizes.sm,
			textAlign: 'center',
		},
		text: {
			color: colors.text.primary,
		},
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		flexRow: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		label: {
			fontSize: FONTS.sizes.lg,
			marginBottom: SPACING.xs,
			fontWeight: FONTS.weights.semibold,
			color: colors.text.primary,
			letterSpacing: 0.3,
		},
	});

	const authStyles = StyleSheet.create({
		container: {
			...commonStyles.container,
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: 20,
			paddingBottom: SPACING.xxxl,
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
		icon: {
			width: 200,
			height: 100,
			resizeMode: 'contain',
			marginBottom: 20,
		},
		input: {
			...commonStyles.input,
			backgroundColor: 'transparent',
			padding: 0,
			borderRadius: 0,
			borderTopWidth: 0,
			borderLeftWidth: 0,
			borderRightWidth: 0,
			height: 40,
			marginBottom: 20,
			justifyContent: 'center',
			color: 'black',
		},
		button: {
			...commonStyles.button,
			backgroundColor: colors.background,
			flexDirection: 'row',
			width: '100%',
			borderWidth: 1,
			borderColor: colors.border.default,
			marginBottom: SPACING.md,
		},
		buttonDisabled: {
			backgroundColor: '#ccc',
			borderColor: '#ccc',
		},
		buttonText: {
			...commonStyles.buttonText,
			color: colors.text.primary,
		},
		backgroundImage: {
			flex: 1,
			width: width,
			height: height,
			justifyContent: 'center',
			alignItems: 'center',
		},
		text: {
			color: colors.text.primary,
			fontSize: 16,
		},
		termsText: {
			color: colors.text.secondary,
			fontSize: FONTS.sizes.sm,
			textAlign: 'center',
		},
		link: {
			color: colors.primary,
			fontWeight: FONTS.weights.semibold,
		},
		modalOverlay: {
			flex: 1,
			backgroundColor: 'transparent',
			justifyContent: 'flex-end',
		},
		modalContent: {
			backgroundColor: 'white',
			borderWidth: 1,
			borderColor: '#eee',
			borderTopLeftRadius: 20,
			borderTopRightRadius: 20,
			paddingHorizontal: 20,
			minHeight: '45%',
		},
	});

	const splashStyles = StyleSheet.create({
		container: {
			...StyleSheet.absoluteFillObject,
			backgroundColor: 'transparent',
			overflow: 'hidden',
		},
		dot: {
			position: 'absolute',
			width: DOT_SIZE,
			height: DOT_SIZE,
			borderRadius: DOT_SIZE / 2,
			backgroundColor: colors.primary, // You can change this color to match your app's theme
		},
		subtitle: {
			fontSize: 16,
			color: '#666',
			zIndex: 2, // Ensure text appears above the animation
		},
		logo: {
			width: 150,
			height: 150,
			marginBottom: 20,
			zIndex: 2, // Ensure logo appears above the animation
		},
	});

	const appStyles = StyleSheet.create({
		container: {
			...commonStyles.container,
		},
		textBox: {
			...commonStyles.input,
			height: 40,
			width: '75%',
			margin: 10,
		},
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
			color: colors.text.primary,
		},
		profileEmail: {
			fontSize: 16,
			color: colors.text.secondary,
		},
		signOutButton: {
			...commonStyles.button,
			...commonStyles.shadowEffect,
			backgroundColor: colors.primary,
			marginHorizontal: 20,
			position: 'absolute',
			bottom: 40,
			left: 0,
			right: 0,
			marginBottom: 200,
		},
		signOutText: {
			...commonStyles.buttonText,
			color: colors.background,
		},
		avatarIcon: {
			width: 48,
			height: 48,
			borderRadius: 24,
			justifyContent: 'center',
			marginRight: SPACING.md,
		},
	});

	const eventDetailStyles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 10,
			backgroundColor: colors.background,
		},
		scrollView: {
			padding: 10,
			fontSize: 16,
		},
		text: {
			color: colors.text.primary,
			fontSize: 16,
		},
		headerSection: {
			padding: 20,
			flex: 1,
			width: '100%',
			flexDirection: 'column',
			alignItems: 'center',
		},
		title: {
			fontSize: 24,
			fontWeight: 'bold',
			color: colors.text.primary,
			flexWrap: 'wrap',
			textAlign: 'center',
			marginTop: 16,
		},
		subtitle: {
			fontSize: 14,
			fontStyle: 'italic',
			color: colors.text.primary,
			alignSelf: 'center',
		},
		hostInfo: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 10,
		},
		hostImage: {
			width: 120,
			height: 120,
			borderRadius: 20,
			marginRight: 12,
			alignSelf: 'center',
		},
		hostDetails: {
			flex: 1,
		},
		hostName: {
			fontSize: 16,
			fontWeight: '600',
		},
		hostEmail: {
			fontSize: 14,
			marginTop: 2,
		},

		detailRow: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 16,
		},
		descriptionContainer: {
			marginTop: 20,
		},
		descriptionTitle: {
			fontSize: 18,
			fontWeight: '600',
			marginBottom: 8,
			color: colors.text.primary,
		},
		description: {
			color: colors.text.primary,
			marginTop: 10,
			fontSize: 16,
			lineHeight: 24,
		},
		sectionTitle: {
			fontSize: 18,
			fontWeight: '600',
			marginBottom: 12,
		},
		attendeesList: {
			flexDirection: 'column',
			flexWrap: 'wrap',
		},
		attendeeItem: {
			marginRight: 12,
			marginBottom: 8,
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
		},
		attendeeImage: {
			width: 40,
			height: 40,
			borderRadius: 20,
			marginRight: 12,
		},
		attendeeName: {
			fontSize: 14,
		},
		tagsSection: {
			padding: 20,
			paddingTop: 0,
		},
		tagsList: {
			flexDirection: 'row',
			flexWrap: 'wrap',
		},
		tagItem: {
			paddingHorizontal: 12,
			paddingVertical: 6,
			borderRadius: 16,
			marginRight: 8,
			marginBottom: 8,
		},
		tagText: {
			fontSize: 14,
		},
		attendButton: {
			margin: 20,
			padding: 16,
			borderRadius: 8,
			alignItems: 'center',
		},
		attendButtonText: {
			color: 'white',
			fontSize: 16,
			fontWeight: '600',
		},
		errorText: {
			fontSize: 16,
			textAlign: 'center',
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
			...commonStyles.shadowEffect,
			backgroundColor: colors.background,
			marginHorizontal: 20,
			marginBottom: 30,
			borderRadius: 25,
			borderColor: colors.border.default,
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: 70,
			padding: 10,
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
			backgroundColor: colors.text.primary,
		},
		inactiveIconContainer: {
			backgroundColor: 'gray',
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
			color: colors.text.primary,
			fontWeight: '600',
		},

		inactiveTabText: {
			color: colors.text.primary,
		},
		plusButton: {
			position: 'absolute',
			right: 4, // Adjust as needed for your design
			bottom: 80, // Adjust to hover above the tab bar
			zIndex: 10,
			backgroundColor: colors.primary, // Or your preferred color
			width: 60,
			height: 60,
			borderRadius: 30,
			alignItems: 'center',
			justifyContent: 'center',
			elevation: 5, // For Android shadow
			shadowColor: '#000', // For iOS shadow
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 4,
		},
		fabButton: {
			position: 'absolute',
			alignSelf: 'flex-end',
			bottom: 100,
		},
		subButton: {
			backgroundColor: colors.primary,
			width: 'auto',
			height: 'auto',
			padding: 12,
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
		progressContainer: {
			marginTop: SPACING.xl,
			marginBottom: SPACING.xxxl,
		},
		progressBar: {
			height: 4,
			backgroundColor: colors.border.light,
			borderRadius: 2,
			overflow: 'hidden',
		},
		progressFill: {
			height: '100%',
			backgroundColor: colors.primary,
			borderRadius: 2,
		},
		stepText: {
			color: colors.text.secondary,
			fontSize: FONTS.sizes.sm,
			marginTop: SPACING.sm,
			textAlign: 'center',
		},
		mainContent: {
			//flex: 1,
			width: '100%',
			paddingHorizontal: SPACING.lg,
		},
		title: {
			fontSize: FONTS.sizes.xxl,
			fontWeight: FONTS.weights.bold,
			color: colors.text.primary,
			marginBottom: SPACING.sm,
		},
		subtitle: {
			fontSize: FONTS.sizes.lg,
			color: colors.text.secondary,
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
			borderColor: colors.primary,
			borderWidth: 2,
		},
		errorText: {
			color: colors.primary,
			fontSize: FONTS.sizes.sm,
			marginTop: SPACING.sm,
		},
		tagSection: {
			marginVertical: SPACING.xxxl,
		},
		tagHelper: {
			fontSize: FONTS.sizes.sm,
			color: colors.text.secondary,
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
			borderColor: colors.border.input,
			alignItems: 'center',
			justifyContent: 'center',
		},
		backButtonText: {
			color: colors.text.primary,
			fontSize: FONTS.sizes.md,
			fontWeight: FONTS.weights.semibold,
		},
		nextButtonContainer: {
			flex: 1,
		},
		nextButton: {
			flex: 1,
			backgroundColor: colors.primary,
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
			color: colors.text.primary,
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
			backgroundColor: colors.background,
			borderRadius: SPACING.md,
			padding: SPACING.lg,
			marginBottom: SPACING.xxl,
		},
		locationIconContainer: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: colors.border.light,
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
			color: colors.text.primary,
			marginBottom: 2,
		},
		locationSubtitle: {
			fontSize: FONTS.sizes.sm,
			color: colors.text.secondary,
		},
		useButton: {
			backgroundColor: colors.primary,
			paddingHorizontal: SPACING.lg,
			paddingVertical: SPACING.sm,
			borderRadius: SPACING.sm,
		},
		useButtonText: {
			color: colors.background,
			fontSize: FONTS.sizes.sm,
			fontWeight: FONTS.weights.semibold,
		},
		sectionTitle: {
			fontSize: FONTS.sizes.md,
			fontWeight: FONTS.weights.semibold,
			color: colors.text.primary,
			marginBottom: SPACING.md,
		},
		popularLocationItem: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: SPACING.md,
			borderBottomWidth: 1,
			borderBottomColor: colors.border.light,
		},
		dateTimeSection: {
			marginBottom: SPACING.xxl,
		},
		dateTimeButton: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.background,
			borderRadius: SPACING.md,
			padding: SPACING.lg,
			marginBottom: SPACING.md,
			shadowColor: colors.shadow,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 2,
		},
		dateTimeText: {
			fontSize: FONTS.sizes.md,
			color: colors.text.primary,
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
			backgroundColor: colors.primary,
		},
	});

	const prayerRequestStyles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		scrollContainer: {
			flex: 1,
			paddingHorizontal: SPACING.lg,
			paddingTop: SPACING.md,
		},
		input: {
			flex: 1,
			minHeight: 80,
			maxHeight: 180,
			backgroundColor: colors.background,
			borderRadius: SPACING.md,
			padding: SPACING.md,
			borderWidth: 1,
			borderColor: colors.border.input,
			fontSize: FONTS.sizes.md,
			color: colors.text.primary,
		},
		characterCount: {
			alignSelf: 'flex-end',
			marginTop: 4,
			marginRight: 4,
			fontSize: FONTS.sizes.sm,
			color: colors.text.secondary,
		},
		imageContainer: {
			marginVertical: SPACING.md,
			paddingLeft: 2,
			minHeight: 70,
		},
		imageWrapper: {
			marginRight: SPACING.md,
			position: 'relative',
		},
		image: {
			width: 150,
			height: 150,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: colors.border.input,
		},
		removeImage: {
			position: 'absolute',
			top: 2,
			right: 2,
			backgroundColor: 'rgba(0,0,0,0.5)',
			borderRadius: 10,
			padding: 2,
			zIndex: 2,
		},
		footer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: SPACING.lg,
			paddingVertical: SPACING.md,
			backgroundColor: colors.background,
			borderTopWidth: 1,
			borderTopColor: colors.border.light,
		},
		imageButton: {
			padding: SPACING.md,
			borderRadius: 50,
			backgroundColor: colors.background,
			marginRight: SPACING.md,
			borderWidth: 1,
			borderColor: colors.border.input,
		},
		submitButton: {
			flex: 1,
			backgroundColor: colors.primary,
			paddingVertical: SPACING.md,
			borderRadius: SPACING.md,
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: SPACING.md,
		},
		submitButtonDisabled: {
			backgroundColor: colors.border.input,
		},
		submitButtonText: {
			color: colors.background,
			fontSize: FONTS.sizes.md,
			fontWeight: FONTS.weights.semibold,
		},
	});

	const postStyles = StyleSheet.create({
		container: {
			...commonStyles.container,
			backgroundColor: colors.surface,
			overflow: 'hidden',
			borderRadius: 10,
			borderWidth: 1,
			borderColor: colors.border.default,
			marginBottom: SPACING.sm,
			padding: SPACING.md,
		},
		text: {
			...commonStyles.text,
		},
		tagsContainer: {
			...commonStyles.flexRow,
			gap: SPACING.sm,
			marginTop: SPACING.sm,
		},
		tag: {
			...commonStyles.text,
			backgroundColor: colors.text.secondary,
			borderRadius: SPACING.sm,
			padding: SPACING.xs,
			fontSize: FONTS.sizes.sm,
		},
		headerContainer: {
			...commonStyles.flexRow,
			gap: SPACING.sm,
		},
		headerText: {
			...commonStyles.text,
			fontSize: FONTS.sizes.md,
		},
		titleText: {
			...commonStyles.text,
			fontWeight: FONTS.weights.bold,
			alignSelf: 'center',
			marginVertical: 10,
			fontSize: '16',
		},
	});

	return {
		commonStyles,
		authStyles,
		appStyles,
		tabBarStyles,
		createEventStyles,
		splashStyles,
		eventDetailStyles,
		prayerRequestStyles,
		postStyles,
	};
};
