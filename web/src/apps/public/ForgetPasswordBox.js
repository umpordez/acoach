import React, { useState } from 'react';
import { useFocus } from '../../utils';

import { Link } from 'react-router-dom';
import RedirectBox from './RedirectBox';
import BoxHeader from './BoxHeader';

function submitRecoverPassword(email) {
    if (!email) { return { error: 'Duh, preencha o e-mail!' }; }

    return { success: true };
}

export default function ForgetPasswordBox() {
    const [ email, setEmail ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ hasSentEmail, setHasSentEmail ] = useState(false);
    const [ emailRef, setEmailFocus ] = useFocus();

    if (hasSentEmail) {
        return <RedirectBox
            redirectUrl='/'
            startTimer={ 5 }>Ajuda enviada!</RedirectBox>
    }

    return <main className='box'>
        <BoxHeader errorMessage={ errorMessage }>No problema!</BoxHeader>

        <main>
            <p>Ok, ok... vamos recuperar isso juntos :)</p>

            <form onSubmit={ async(ev) => {
                ev.preventDefault();
                const { error } = await submitRecoverPassword(email);

                if (error) {
                    setEmailFocus();
                    return setErrorMessage(error);
                }

                setHasSentEmail(true);
            } } >
                <input
                    autoFocus={ true }
                    onChange={ ({ nativeEvent }) => {
                        setEmail(nativeEvent.target.value
                            .trim()
                            .toLowerCase()
                            .replace(/[^\w\d_\-@.]/g,'')
                        );
                    } }
                    autoComplete='email'
                    className={ errorMessage ? 'invalid' : '' }
                    placeholder='o seu e-mail de acesso'
                    ref={ emailRef }
                    value={ email }
                    id='email'
                    type='email' />

                <button type='submit'>please, help me</button>
            </form>

            <Link to={ '/' }>ohh... eu lembrei!</Link>
        </main>
    </main>;

}
