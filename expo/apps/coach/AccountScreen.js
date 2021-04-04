import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { H1, Link } from '../../components/text';
import Display from '../../components/Display';
import { useTheme } from '../../theme';
import { UserContext } from '../../context';

import { clear } from '../../db/SecureStore';

function AccountScreen() {
    const { setUser } = useContext(UserContext);
    const { toggleTheme } = useTheme();

    return <Display style={ styles.container }>
        <View style={ styles.screenBox }>
            <H1>My account</H1>

            <View style={ { alignItems: 'flex-start', paddingBottom: 10 } }>
                <Link onPress={ async() => {
                    await clear();
                    setUser();
                } }>logout</Link>
            </View>

            <View style={ { alignItems: 'center', padding: 10 } }>
                <Link onPress={ toggleTheme }>change theme</Link>
            </View>
        </View>
    </Display>;
}

export default AccountScreen;

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
