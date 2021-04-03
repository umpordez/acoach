import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { validations, useFocus, randomNumber } from '../../utils';
import { UserContext } from '../../context';

import RedirectBox from './RedirectBox';
import BoxHeader from './BoxHeader';

import ajaxAdapter from '../../ajaxAdapter';

const { notFoundMessages } = validations;

async function submitSignUp(user) {
    if (!user.name) {
        return { error: 'Duh, preencha o nome!', field: 'name'};
    }

    if (!user.email) {
        return { error: 'Duh, preencha o e-mail!', field: 'email' };
    }

    if (!user.password) {
        return { error: 'Duh, preencha a senha!', field: 'password' };
    }

    try {
        const res = await ajaxAdapter.post('/sign-up', user);
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

export default function SignUpBox() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorObject, setErrorObject ] = useState(null);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { setUser } = useContext(UserContext);

    const [ emailRef, setEmailFocus ] = useFocus();
    const [ passwordRef, setPasswordFocus ] = useFocus();
    const [ nameRef, setNameFocus ] = useFocus();

    if (isLoggedIn) {
        return <RedirectBox redirectUrl='/' redirectHandler={ () => {
            setUser();
        } } />
    }

    const errorField = errorObject && errorObject.field;

    return <main className='box'>
        <BoxHeader errorMessage={
            errorObject && errorObject.message
        }>Cadastre-se.</BoxHeader>

        <main>
            <p>Para cuidar bem de seus clientes, preencha os seus dados abaixo:</p>
            <form onSubmit={ async(ev) => {
                ev.preventDefault();

                const { error, field } = await submitSignUp({ name, email, password });

                if (error) {
                    if (field === 'name') { setNameFocus(); }
                    if (field === 'email') { setEmailFocus(); }
                    if (field === 'password') { setPasswordFocus(); }

                    return setErrorObject({ message: error, field });
                }


                setIsLoggedIn(true);
            } } >
                <input
                    onChange={ ({ nativeEvent }) => {
                        setName(nativeEvent.target.value);
                    } }
                    ref={ nameRef }
                    autoFocus={ true }
                    autoComplete='name'
                    placeholder='o seu nome aqui'
                    value={ name }
                    className={ errorField === 'name' ? 'invalid' : '' }
                    type='text' />

                <input
                    onChange={ ({ nativeEvent }) => {
                        setEmail(nativeEvent.target.value
                            .trim()
                            .toLowerCase()
                            .replace(/[^\w\d_\-@.]/g,'')
                        );
                    } }
                    autoComplete='email'
                    placeholder='o seu e-mail de acesso'
                    className={ errorField === 'email' ? 'invalid' : '' }
                    ref={ emailRef }
                    value={ email }
                    type='email' />

                <input
                    onChange={ ({ nativeEvent }) => {
                        setPassword(nativeEvent.target.value);
                    } }
                    autoComplete='new-password'
                    placeholder='a sua senha em acoach'
                    ref={ passwordRef }
                    className={ errorField === 'password' ? 'invalid' : '' }
                    value={ password }
                    type='password' />

                <button type='submit'>acessar</button>
            </form>

            <Link to={ '/' }>ei, eu tenho um login!</Link>
        </main>
    </main>;
}
