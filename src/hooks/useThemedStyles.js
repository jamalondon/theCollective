import { useMemo } from 'react';
import { useAppTheme } from './useAppTheme';
import { createStyles } from '../constants/style';

export const useThemedStyles = () => {
	const { colors } = useAppTheme();
	// Memoize styles to prevent unnecessary recalculation
	const styles = useMemo(() => {
		if (!colors) return {}; // Guard against undefined colors
		return createStyles(colors);
	}, [colors]);

	return styles;
};
