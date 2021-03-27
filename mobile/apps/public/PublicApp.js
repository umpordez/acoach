import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../assets/themes';

import Display from '../../components/Display';
import LoginScreen from './LoginScreen';

function PublicApp() {
    const { mode } = useTheme();

    return <Display style={ { flex: 1 } }>
        <LoginScreen />
        <StatusBar barStyle={ `${mode}-content` } />
    </Display>
}

export default PublicApp;
