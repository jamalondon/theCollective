import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tryLocalSignIn } from '../store/userThunks.js';
import * as RootNavigation from '../navigation/navigationRef';

const LockScreen = () => {
	//redux dispatch function
	const dispatch = useDispatch();
	//redux state selectors
	const token = useSelector((state) => state.user.token);

	useEffect(() => {
		dispatch(tryLocalSignIn());
	}, []);

	useEffect(() => {
		// This will only run when the token value changes
		if (token) {
			RootNavigation.navigate('App');
		} else {
			RootNavigation.navigate('Auth');
		}
	}, [token]);
};

export default LockScreen;
