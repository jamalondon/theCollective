import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const EntypoIcon = ({ name, size, color }) => {
	return <Entypo name={name} size={size} color={color} />;
};

const IoniconsIcon = ({ name, size, color }) => {
	return <Ionicons name={name} size={size} color={color} />;
};

const MaterialIcon = ({ name, size, color }) => {
	return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

export default {
	EntypoIcon,
	IoniconsIcon,
	MaterialIcon,
};
