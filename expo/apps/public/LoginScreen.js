import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Link, H1, P } from '../../components/text';
import Input from '../../components/Input';
import Display from '../../components/Display';
import { validations, useFocus, randomNumber } from '../../utils';

import Button from '../../components/Button';
import ajaxAdapter from '../../ajaxAdapter';

const { notFoundMessages } = validations;

async function submitLogin(user) {
    if (!user.email) {
        return { error: 'Duh, preencha o e-mail!', field: 'email' };
    }

    if (!user.password) {
        return { error: 'Duh, preencha a senha!', field: 'password' };
    }

    try {
        const res = await ajaxAdapter.post('/login', user);
        console.log(res);
    } catch(ex) {
        if (/not found/i.test(ex.message)) {
            const rand = randomNumber(0, notFoundMessages.length - 1);

            return { error: notFoundMessages[rand] };
        }

        global.error(ex);
        return { error: ex.message };
    }

    return { success: true };
}
function LoginScreen({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errorObject, setErrorObject ] = useState(null);

    const [ emailRef, setEmailFocus ] = useFocus();
    const [ passwordRef, setPasswordFocus ] = useFocus();

    async function onSubmit() {
        const { error, field } = await submitLogin({ email, password });

        if (error) {
            if (field === 'email') { setEmailFocus(); }
            if (field === 'password') { setPasswordFocus(); }

            return setErrorObject({ message: error, field });
        }
    }

    return <Display style={ styles.container }>
        <View style={ styles.loginBox }>
            <H1>{ (errorObject && errorObject.message) || 'Welcome' }</H1>

            <P>Para acessar, preencha os seus dados abaixo:</P>
            <Input
                ref={ emailRef }
                onChangeText={ (value) => {
                    setEmail(value
                        .trim()
                        .toLowerCase()
                        .replace(/[^\w\d_\-@.]/g,'')
                    );
                } }
                onSubmitEditing={ () => {
                    setPasswordFocus();
                } }
                blurOnSubmit={ false }
                value={ email }
                isInvalid={ errorObject && errorObject.field === 'email' }
                autoFocus={ true }
                secureTextEntry={ false }
                autoCompleteType='email'
                autoCapitalize='none'
                placeholder='o seu e-mail de acesso' />

            <Input
                ref={ passwordRef }
                value={ password }
                onChangeText={ (value) => {
                    setPassword(value);
                } }
                onSubmitEditing={ onSubmit }
                secureTextEntry={ true }
                isInvalid={ errorObject && errorObject.field === 'password' }
                autoCompleteType='password'
                type='password'
                autoCapitalize='none'
                placeholder='a sua senha de acesso' />

            <View style={ { marginBottom: 10, alignItems: 'flex-end' } }>
                <Link style={ { fontSize: 13 } } onPress={ () => {
                    navigation.navigate('ForgetPassword');
                } }>esqueci minha senha</Link>
            </View>

            <Button onPress={ onSubmit }>acessar sua conta</Button>
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
