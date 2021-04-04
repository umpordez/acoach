import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';

import Display from '../../components/Display';
import ThemedApp from '../../ThemedApp';

import { H1 } from '../../components/text';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return <H1>Welcome home</H1>;
}

function PublicApp() {
    const { mode } = useTheme();

    return <NavigationContainer>
        <ThemedApp>{ ({ nextModeText, setNextUiMode }) =>
            <Display style={ { flex: 1 } }>
                <Tab.Navigator>
                    <Tab.Screen name='Tasks' component={ HomeScreen } />
                    <Tab.Screen name='@Deividy' component={ HomeScreen } />
                </Tab.Navigator>
                <StatusBar style={ mode === 'dark' ? 'light' : 'dark' } />
            </Display>}
        </ThemedApp>
    </NavigationContainer>;
}

export default PublicApp;
