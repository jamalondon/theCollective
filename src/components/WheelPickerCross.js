import React from 'react';
import { Platform, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import WheelPicker from 'react-native-wheel-picker-android';

const WheelPickerCross = ({
	selectedItem,
	data,
	onItemSelected,
	style,
	...props
}) => {
	if (Platform.OS === 'android') {
		return (
			<WheelPicker
				selectedItem={selectedItem}
				data={data}
				onItemSelected={onItemSelected}
				style={style}
				{...props}
			/>
		);
	}

	// iOS Picker
	return (
		<View style={[{ height: 150 }, style]}>
			<Picker
				selectedValue={data[selectedItem]}
				onValueChange={(itemValue) => {
					const index = data.indexOf(itemValue);
					onItemSelected(index);
				}}
				itemStyle={{
					fontSize: 22,
					height: 120,
					color: '#333',
					textAlign: 'center',
				}}
			>
				{data.map((item) => (
					<Picker.Item key={item} label={item} value={item} color="#333" />
				))}
			</Picker>
		</View>
	);
};

export default WheelPickerCross;
