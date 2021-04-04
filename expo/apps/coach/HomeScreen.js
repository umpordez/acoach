import React from 'react';
import { View, StyleSheet } from 'react-native';
import { H1 } from '../../components/text';
import Display from '../../components/Display';

function HomeScreen() {
    return <Display style={ styles.container }>
        <View style={ styles.screenBox }>
            <H1>Welcome, home</H1>
        </View>
    </Display>;
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    screenBox: {
        paddingLeft: 15,
        paddingRight: 15,
        width: '100%'
    }
});
