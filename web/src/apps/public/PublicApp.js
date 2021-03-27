import React, { useContext, useState, useEffect } from 'react';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect
} from 'react-router-dom';

import { useFocus, randomNumber } from '../../utils';
import { getCurrentUiMode, changeUiMode } from '../../theme';
import { UserContext } from '../../context';

import ajaxAdapter from '../../ajaxAdapter';

const notFoundMessages = [
    'Sorry, no matches.',
    'User + Password did not work',
    'WRONG!',
    'E-mail ou senha errado.',
    'Dados inválidos.'
];

async function submitLogin(user) {
    if (!user.email) { return { error: 'Duh, preencha o e-mail!' }; }
    if (!user.password) { return { error: 'Duh, preencha a senha!' }; }

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

function submitRecoverPassword(email) {
    if (!email) { return { error: 'Duh, preencha o e-mail!' }; }

    return { success: true };
}

function RedirectBox({
    redirectHandler,
    redirectUrl,
    children = 'Tudo certo...', startTimer = 3
}) {
    const [ timer, setTimer ] = useState(startTimer);

    useEffect(() => {
        const timeout = setTimeout(() => { setTimer(timer - 1); }, 1000);
        return () => clearTimeout(timeout);
    });

    if (timer === 0 && redirectHandler) { redirectHandler(); }

    return <main className='box'>
        <header>
            <h2>{ children }</h2>
        </header>
        <main>
            { timer === 0 && <Redirect to={ redirectUrl } /> }
            <p>
                <small>só pra não te redirecionar sem mais nem menos...</small>
            </p>

            <p>
                você será redirecionado daqui { timer } segundo{
                    timer > 1 ? 's' : ''
                }, ou quando clicar <Link
                    onClick={ redirectHandler } to={ redirectUrl }>aqui</Link>.
            </p>
        </main>
    </main>;
}

function BoxHeader({ errorMessage, children }) {
    if (errorMessage) {
        return <header>
            <h2>{ errorMessage }</h2>
        </header>;
    }

    return <header>
        <h2>{ children }</h2>
    </header>

}

function isEmailInvalid(errorMessage) {
    return /mail/.test(errorMessage) || notFoundMessages.includes(errorMessage);
}

function isPasswordInvalid (errorMessage) {
    return/senha/.test(errorMessage) || notFoundMessages.includes(errorMessage);
}

function LoginBox() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { setUser } = useContext(UserContext);

    const [ emailRef, setEmailFocus ] = useFocus();
    const [ passwordRef, setPasswordFocus ] = useFocus();

    if (isLoggedIn) {
        return <RedirectBox redirectUrl='/' redirectHandler={ () => {
            setUser({ role: 'coach' });
        } } />
    }

    return <main className='box'>
        <BoxHeader errorMessage={ errorMessage }>Identifique-se.</BoxHeader>

        <main>
            <p>Entre com os seus dados abaixo:</p>
            <form onSubmit={ async(ev) => {
                ev.preventDefault();

                const { error } = await submitLogin({ email, password });
                if (error) {
                    if (isEmailInvalid(errorMessage)) {
                        setEmailFocus();
                    } else if (isPasswordInvalid(errorMessage)) {
                        setPasswordFocus();
                    }
                    return setErrorMessage(error);
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
                    className={ isEmailInvalid(errorMessage) ? 'invalid' : '' }
                    autoFocus={ true }
                    autoComplete='email'
                    placeholder='o seu e-mail de acesso'
                    ref={ emailRef }
                    value={ email }
                    id='email'
                    type='email' />

                <input
                    onChange={ ({ nativeEvent }) => {
                        setPassword(nativeEvent.target.value);
                    } }
                    className={ isPasswordInvalid(errorMessage) ? 'invalid' : '' }
                    autoComplete='current-password'
                    placeholder='a sua senha em nosso club'
                    ref={ passwordRef }
                    value={ password }
                    id='pass'
                    type='password' />

                <button type='submit'>acessar</button>
            </form>

            <Link to={ '/forget' }>forgot my password... help?</Link>
            <br />
            <a href='https://umpordez.com'
                rel='noreferrer' target='_blank'>where am I?</a>
        </main>
    </main>;
}

function ForgetPasswordBox() {
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

let isInCrazyMode = false;
function PublicApp() {
    const [ uiMode, setUiMode ] = useState(getCurrentUiMode());

    useEffect(() => {
        changeUiMode(uiMode);
    });

    const nextModeText = uiMode ? 'dark side' : 'contrast mode';
    const nextUiMode = uiMode ? null : 'contrast';

    return <React.Fragment>
        <Router>
            <Switch>
                <Route path='/login'>
                    <LoginBox />
                </Route>

                <Route path='/forget'>
                    <ForgetPasswordBox />
                </Route>

                <Route path='/'>
                    <LoginBox />
                </Route>
            </Switch>
        </Router>

        <footer>
            <span onClick={ () => {
                setUiMode(nextUiMode);

                if (isInCrazyMode || randomNumber(0, 500) === 420) {
                    isInCrazyMode = true;

                    let i = 0;
                    setInterval(() => {
                        setUiMode((++i) % 2 && 'contrast');
                    }, 500);
                    return;
                }

                if (randomNumber(400, 500) === 420) {
                    document.querySelector('#root > footer').innerHTML = `
                        <span class='small'>aaaaand, it's gone.</span>
                    `;
                }
            } } className='link small'>{ nextModeText }</span>
        </footer>
    </React.Fragment>
}

export default PublicApp;
