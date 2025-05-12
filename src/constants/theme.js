import { Dimensions } from 'react-native';

export const LIGHT_COLORS = {
	primary: '#FF6B6B',
	background: '#ffffff',
	surface: '#f8f9fa',
	text: {
		primary: '#333333',
		secondary: '#868e96',
		light: '#999999',
	},
	border: {
		default: '#E5E5E5',
		disabled: '#ccc',
		light: '#f1f3f5',
		input: '#e9ecef',
	},
	shadow: 'rgba(0, 0, 0, 1)',
	card: '#ffffff',
	error: '#dc3545',
	success: '#28a745',
	warning: '#ffc107',
};

export const DARK_COLORS = {
	primary: '#FF6B6B',
	background: 'rgba(0, 0, 0, 1)',
	surface: '#1E1E1E',
	text: {
		primary: '#E1E1E1',
		secondary: '#B0B0B0',
		light: '#808080',
	},
	border: {
		default: '#2D2D2D',
		light: '#3D3D3D',
		input: '#2D2D2D',
	},
	shadow: 'rgba(255, 252, 252, .5)',
	card: '#1E1E1E',
	error: '#cf6679',
	success: '#4caf50',
	warning: '#ff9800',
};

export const DIMENSIONS = {
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height,
};

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	xxxl: 32,
};

export const FONTS = {
	sizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 24,
		xxl: 28,
	},
	weights: {
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
};
