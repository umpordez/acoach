import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '../assets/themes';

function Input(props) {
    const { theme } = useTheme();

    return <TextInput
        placeholderTextColor={ theme.inputPlaceholderTextColor }
        style={ {
            ...theme.input,
            borderColor: theme.mainBorderColor
        } }
        underlineColorAndroid='transparent'
        { ...props } />
}

export default Input;
