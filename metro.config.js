// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
	...defaultConfig,
	resolver: {
		...defaultConfig.resolver,
		sourceExts: [
			...defaultConfig.resolver.sourceExts,
			'expo.ts',
			'expo.tsx',
			'expo.js',
			'expo.jsx',
		],
		assetExts: [...defaultConfig.resolver.assetExts, 'bin'],
	},
	server: {
		...defaultConfig.server,
		rewriteRequestUrl: (url) => {
			if (!url.endsWith('.bundle')) {
				return url;
			}
			// https://github.com/facebook/react-native/issues/36794
			return url.replace(/^https?:\/\/[^/]+\//, '');
		},
	},
};

module.exports = config;
