import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '../theme';

function Input(props) {
    const { theme } = useTheme();

    return <TextInput
        placeholderTextColor={
            theme.inputColors.placeholderTextColor
        }
        style={ {
            ...theme.input,
            backgroundColor: theme.inputColors.background,
            color: theme.inputColors.text,
            borderColor: theme.mainBorderColor
        } }
        underlineColorAndroid='transparent'
        { ...props } />
}

export default Input;
