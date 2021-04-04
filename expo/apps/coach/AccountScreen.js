import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { H1, P, Link } from '../../components/text';
import Display from '../../components/Display';
import { useTheme } from '../../theme';
import { UserContext } from '../../context';

import { clear } from '../../db/SecureStore';

function onlyFirstName(name) {
    name = name.split(/\s/g)[0];
    // to upper initial
    name = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    return name;
}

function AccountScreen() {
    const { user, setUser } = useContext(UserContext);
    const { mode, toggleTheme } = useTheme();

    return <Display style={ styles.container }>
        <View style={ styles.screenBox }>
            <View style={ {
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
            } }>
                <H1>My account</H1>
                <Link onPress={ async() => {
                    await clear();
                    setUser();
                } }>logout</Link>
            </View>
            <View style={ { flex: 1 } }>
                <P>Hello, { onlyFirstName(user.name) }, tudo bem? :)</P>
            </View>
            <View style={ { alignItems: 'center', padding: 10 } }>
                <Link onPress={ toggleTheme }>{
                    mode === 'dark' ? 'light theme' : 'dark theme'
                }</Link>
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
        width: '100%',
        flex: 1
    }
});
