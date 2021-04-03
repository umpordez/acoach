import React from 'react';
import { View, StyleSheet } from 'react-native';

import Display from '../../components/Display';
import { H1 } from '../../components/text';

function ForgetPasswordScreen() {
    return <Display style={ styles.container }>
        <View style={ styles.loginBox }>
            <H1>meh</H1>
        </View>
    </Display>
}

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    loginBox: {
        padding: 15,
        width: '100%'
    }
});
