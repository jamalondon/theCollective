import { CommonActions } from '@react-navigation/native';

export default function useNavigation({ navigation }) {
	const clearNavigation = (targetRoute) => {
		// This will fail if navigation is undefined
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: targetRoute }],
			})
		);
	};

	return { clearNavigation };
}
