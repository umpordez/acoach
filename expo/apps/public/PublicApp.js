import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';

import Display from '../../components/Display';
import LoginScreen from './LoginScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import ThemedApp from '../../ThemedApp';

import { Link } from '../../components/text';

const Stack = createStackNavigator();

function PublicApp() {
    const { mode } = useTheme();

    return <NavigationContainer>
        <ThemedApp>{ ({ nextModeText, setNextUiMode }) =>
            <Display style={ { flex: 1 } }>
                <View style={ { flex: 1 } }>
                    <Stack.Navigator screenOptions={ {
                        headerShown: false
                    } }>
                        <Stack.Screen name='Login' component={ LoginScreen } />
                        <Stack.Screen
                            name='ForgetPassword'
                            component={ ForgetPasswordScreen } />
                    </Stack.Navigator>
                </View>
                <View style={ { alignItems: 'center', padding: 10 } }>
                    <Link onPress={ setNextUiMode }>{ nextModeText }</Link>
                </View>
                <StatusBar barStyle={ `${mode}-content` } />
            </Display>}
        </ThemedApp>
    </NavigationContainer>;
}

export default PublicApp;
