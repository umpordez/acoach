import React from 'react';
import PropTypes from 'prop-types';

import { SafeAreaView } from 'react-native';
import { useTheme } from '../assets/themes';

export default function Display({ children, style }) {
    const { theme } = useTheme();

    return <SafeAreaView style={ {
        backgroundColor: theme.mainBackgroundColor,
        ...style
    } }>{ children }</SafeAreaView>
}

Display.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};
