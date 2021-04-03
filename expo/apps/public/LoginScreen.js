import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Link, H1, P } from '../../components/text';
import Input from '../../components/Input';
import Display from '../../components/Display';

import Button from '../../components/Button';

function LoginScreen({ navigation }) {
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

            <View style={ { marginBottom: 10, alignItems: 'flex-end' } }>
                <Link style={ { fontSize: 13 } } onPress={ () => {
                    navigation.navigate('ForgetPassword');
                } }>esqueci minha senha</Link>
            </View>

            <Button>
                acessar sua conta
            </Button>
        </View>
    </Display>
}

export default LoginScreen;

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    loginBox: {
        padding: 15,
        width: '100%'
    }
});
