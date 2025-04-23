import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SignInModal from '../Modals/signInModal';
import SignUpModal from '../Modals/signUpModal';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useAppTheme } from '../hooks/useAppTheme';
import { SPACING, FONTS } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
	const [showSignInModal, setShowSignInModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const { authStyles } = useThemedStyles();
	const insets = useSafeAreaInsets();
	const { colors } = useAppTheme();

	const styles = StyleSheet.create({
		logo: {
			fontSize: FONTS.sizes.xxl,
			fontWeight: FONTS.weights.bold,
			color: colors.text.primary,
		},
		title: {
			fontSize: FONTS.sizes.xl,
			fontWeight: FONTS.weights.bold,
			marginBottom: SPACING.xl,
			textAlign: 'left',
			lineHeight: 40,
			color: colors.text.primary,
		},
		buttonContainer: {
			width: '100%',
		},
		buttonIcon: {
			width: 24,
			height: 24,
			marginRight: SPACING.sm,
		},
		socialButtonText: {
			color: colors.text.primary,
		},
		createAccountButton: {
			backgroundColor: colors.primary,
		},
		divider: {
			flexDirection: 'row',
			alignItems: 'center',
			marginVertical: SPACING.lg,
		},
		dividerLine: {
			flex: 1,
			height: 1,
			backgroundColor: colors.border.default,
		},
		dividerText: {
			marginHorizontal: SPACING.md,
			color: colors.text.secondary,
		},
		termsContainer: {
			marginTop: SPACING.lg,
		},
		termsText: {
			color: colors.text.secondary,
			fontSize: FONTS.sizes.sm,
			textAlign: 'center',
		},
		signInContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			marginTop: SPACING.lg,
		},
		signInText: {
			color: colors.text.secondary,
			fontSize: FONTS.sizes.sm,
		},
		link: {
			color: colors.primary,
			fontWeight: FONTS.weights.semibold,
		},
	});

	return (
		<View
			style={[
				authStyles.container,
				{
					paddingTop: insets.top + authStyles.container.padding,
					paddingBottom: insets.bottom + authStyles.container.padding,
					paddingLeft: insets.left + authStyles.container.padding,
					paddingRight: insets.right + authStyles.container.padding,
				},
			]}
		>
			{/* Logo */}
			{/* Replace with your app logo */}
			<Image
				source={require('../data/images/logo.jpg')}
				style={authStyles.icon}
				resizeMode="contain"
			/>

			{/* Title */}
			<Text style={styles.title}>Lets get more connected.{'\n'}Together.</Text>

			<View style={styles.buttonContainer}>
				{/* Google sign in */}
				<TouchableOpacity
					style={authStyles.button}
					onPress={() => {
						/* Handle Google sign in */
					}}
				>
					<Image
						source={require('../data/images/64px_chrome_icon.png')}
						style={styles.buttonIcon}
					/>
					<Text style={[authStyles.buttonText, styles.socialButtonText]}>
						Continue with Google
					</Text>
				</TouchableOpacity>

				{/* Apple sign in */}
				<TouchableOpacity
					style={authStyles.button}
					onPress={() => {
						/* Handle Apple sign in */
					}}
				>
					<Image
						source={require('../data/images/64px_apple.png')}
						style={styles.buttonIcon}
					/>
					<Text style={[authStyles.buttonText, styles.socialButtonText]}>
						Continue with Apple
					</Text>
				</TouchableOpacity>

				{/* Divider */}
				<View style={styles.divider}>
					<View style={styles.dividerLine} />
					<Text style={styles.dividerText}>or</Text>
					<View style={styles.dividerLine} />
				</View>

				{/* Create account button */}
				<TouchableOpacity
					style={[authStyles.button, styles.createAccountButton]}
					onPress={() => setShowSignUpModal(true)}
				>
					<Text style={authStyles.buttonText}>Create account</Text>
				</TouchableOpacity>

				{/* Terms and conditions */}
				<Text style={authStyles.termsText}>
					By signing up, you agree to our{' '}
					<Text style={authStyles.link}>Terms</Text>,{' '}
					<Text style={authStyles.link}>Privacy Policy</Text>, and{' '}
					<Text style={authStyles.link}>Cookie Use</Text>.
				</Text>

				{/* Sign in button */}
				<View style={styles.signInContainer}>
					<Text style={styles.signInText}>Have an account already? </Text>
					<TouchableOpacity onPress={() => setShowSignInModal(true)}>
						<Text style={styles.link}>Sign in</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Sign in modal */}
			<SignInModal
				visible={showSignInModal}
				closeModal={() => setShowSignInModal(false)}
			/>

			{/* Sign up modal */}
			<SignUpModal
				visible={showSignUpModal}
				closeModal={() => setShowSignUpModal(false)}
			/>
		</View>
	);
};

export default WelcomeScreen;
