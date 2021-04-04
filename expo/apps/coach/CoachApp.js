import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';

import Display from '../../components/Display';
import ThemedApp from '../../ThemedApp';

import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';

import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function PublicApp() {
    const { theme, mode } = useTheme();

    return <NavigationContainer>
        <ThemedApp>{ () =>
            <Display style={ { flex: 1 } }>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: function TabBarIcon({ color, size }) {
                            return <FontAwesome5
                                name={ route.name === 'Tasks' ? 'tasks' : 'user-tie' }
                                color={ color }
                                size={ size } />
                    }})}
                    tabBarOptions={ {
                        showLabel: false,
                        activeTintColor: theme.mainHighlightColor,
                        activeBackgroundColor: theme.mainBackgroundColor,
                        inactiveBackgroundColor: theme.mainBackgroundColor,
                        inactiveTintColor: theme.mainTextColor,
                    } }>
                    <Tab.Screen name='Tasks' component={ HomeScreen } />
                    <Tab.Screen name='@Deividy' component={ AccountScreen } />
                </Tab.Navigator>
                <StatusBar style={ mode === 'dark' ? 'light' : 'dark' } />
            </Display>}
        </ThemedApp>
    </NavigationContainer>;
}

export default PublicApp;
