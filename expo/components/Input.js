import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../theme';

const Input = React.forwardRef(function Input(props, ref) {
    const { theme } = useTheme();

    const suffix = props.isInvalid ? 'Invalid' : '';

    return <TextInput
        placeholderTextColor={
            theme.inputColors.placeholderTextColor
        }
        style={ {
            ...theme.input,
            backgroundColor: theme.inputColors[`background${suffix}`],
            color: theme.inputColors[`text${suffix}`],
            borderColor: theme.inputColors[`border${suffix}`]
        } }
        ref={ ref }
        underlineColorAndroid='transparent'
        { ...props } />;
});

Input.propTypes = {
    isInvalid: PropTypes.boolean
};

export default Input;
