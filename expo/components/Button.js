import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { useTheme } from '../theme';
import { Span } from './text';

function Button({ children, type = 'default', onPress }) {
    const { theme } = useTheme();

    return <TouchableOpacity
        activeOpacity={ .1 }
        style={ {
                ...theme.button,
                backgroundColor: theme.buttonColors[type].background,
                borderColor: theme.buttonColors[type].border
            } } onPress={ onPress }>
        <Span style={ {
            ...theme.buttonText,
            fontFamily: theme.buttonFontFamily,
            color: theme.buttonColors[type].text
        } }>{ children }</Span>
    </TouchableOpacity>
}

Button.propTypes = {
    children: PropTypes.any,
    onPress: PropTypes.func,
    type: PropTypes.string
};

export default Button;
