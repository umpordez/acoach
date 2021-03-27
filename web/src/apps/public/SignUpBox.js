import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { validations, randomNumber } from '../../utils';
import { UserContext } from '../../context';

import RedirectBox from './RedirectBox';
import BoxHeader from './BoxHeader';

import ajaxAdapter from '../../ajaxAdapter';

const { notFoundMessages } = validations;

async function submitSignUp(user) {
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
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { setUser } = useContext(UserContext);

    if (isLoggedIn) {
        return <RedirectBox redirectUrl='/' redirectHandler={ () => {
            setUser();
        } } />
    }

    return <main className='box'>
        <BoxHeader errorMessage={ errorMessage }>Cadastre-se.</BoxHeader>

        <main>
            <p>Para cuidar bem de seus clientes, preencha os seus dados abaixo:</p>
            <form onSubmit={ async(ev) => {
                ev.preventDefault();

                const { error } = await submitSignUp({ name, email, password });

                if (error) {
                    return setErrorMessage(error);
                }

                setIsLoggedIn(true);
            } } >
                <input
                    onChange={ ({ nativeEvent }) => {
                        setName(nativeEvent.target.value);
                    } }
                    autoFocus={ true }
                    autoComplete='name'
                    placeholder='o seu nome aqui'
                    value={ name }
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
                    value={ email }
                    type='email' />

                <input
                    onChange={ ({ nativeEvent }) => {
                        setPassword(nativeEvent.target.value);
                    } }
                    autoComplete='new-password'
                    placeholder='a sua senha em acoach'
                    value={ password }
                    type='password' />

                <button type='submit'>acessar</button>
            </form>

            <Link to={ '/' }>ei, eu tenho um login!</Link>
        </main>
    </main>;
}
