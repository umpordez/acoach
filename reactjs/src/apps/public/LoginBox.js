import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { validations, useFocus, randomNumber } from '../../utils';
import { UserContext } from '../../context';

import RedirectBox from './RedirectBox';
import BoxHeader from './BoxHeader';
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
        await ajaxAdapter.post('/login', user);
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

export default function LoginBox() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorObject, setErrorObject ] = useState(null);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { setUser } = useContext(UserContext);

    const [ emailRef, setEmailFocus ] = useFocus();
    const [ passwordRef, setPasswordFocus ] = useFocus();

    if (isLoggedIn) {
        return <RedirectBox redirectUrl='/' redirectHandler={ () => {
            setUser();
        } } />
    }

    const errorField = errorObject && errorObject.field;

    return <main className='box'>
        <BoxHeader errorMessage={
            errorObject && errorObject.message
        }>Identifique-se.</BoxHeader>

        <main>
            <p>Entre com os seus dados abaixo:</p>
            <form onSubmit={ async(ev) => {
                ev.preventDefault();

                const { error, field } = await submitLogin({ email, password });
                if (error) {
                    if (field === 'email') { setEmailFocus(); }
                    if (field === 'password') { setPasswordFocus(); }

                    return setErrorObject({ message: error, field });
                }

                setIsLoggedIn(true);
            } } >
                <input
                    onChange={ ({ nativeEvent }) => {
                        setEmail(nativeEvent.target.value
                            .trim()
                            .toLowerCase()
                            .replace(/[^\w\d_\-@.]/g,'')
                        );
                    } }
                    autoFocus={ true }
                    autoComplete='email'
                    placeholder='o seu e-mail de acesso'
                    ref={ emailRef }
                    value={ email }
                    className={ errorField === 'email' ? 'invalid' : '' }
                    id='email'
                    type='email' />

                <input
                    onChange={ ({ nativeEvent }) => {
                        setPassword(nativeEvent.target.value);
                    } }
                    autoComplete='current-password'
                    placeholder='a sua senha em nosso club'
                    ref={ passwordRef }
                    value={ password }
                    className={ errorField === 'password' ? 'invalid' : '' }
                    id='pass'
                    type='password' />

                <button type='submit'>acessar</button>
            </form>

            <Link to={ '/forget' }>forgot my password... help?</Link>
            <br />
            <Link to={ '/sign-up' }>sign up</Link>
        </main>
    </main>;
}
