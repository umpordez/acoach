import React from 'react';
import { View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';

import Display from '../../components/Display';
import LoginScreen from './LoginScreen';
import ThemedApp from '../../ThemedApp';

import { Link } from '../../components/text';

function PublicApp() {
    const { mode } = useTheme();

    return <ThemedApp>{ ({ nextModeText, setNextUiMode }) =>
        <Display style={ { flex: 1 } }>
            <View style={ { flex: 1 } }>
                <LoginScreen />
            </View>
            <View style={ { alignItems: 'center', padding: 10 } }>
                <Link onPress={ setNextUiMode }>{ nextModeText }</Link>
            </View>
            <StatusBar barStyle={ `${mode}-content` } />
        </Display>}
    </ThemedApp>;
}

export default PublicApp;
