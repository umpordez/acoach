import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { H1, P } from '../../components/text';
import Input from '../../components/Input';
import Display from '../../components/Display';

function LoginScreen() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return <Display style={ styles.container }>
        <View style={ styles.loginBox }>
            <H1>Welcome</H1>

            <P>Para acessar, preencha os seus dados abaixo:</P>
            <Input
                onChangeText={ (value) => {
                    setEmail(value
                        .trim()
                        .toLowerCase()
                        .replace(/[^\w\d_\-@.]/g,'')
                    );
                } }
                value={ email }
                autoFocus={ true }
                secureTextEntry={ false }
                autoCompleteType='email'
                autoCapitalize='none'
                placeholder='o seu e-mail de acesso' />

            <Input
                value={ password }
                onChangeText={ (value) => {
                    setPassword(value);
                } }
                secureTextEntry={ true }
                autoCompleteType='password'
                type='password'
                autoCapitalize='none'
                placeholder='a sua senha de acesso' />
        </View>
    </Display>
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginBox: {
        padding: 15,
        width: '100%'
    }
});
