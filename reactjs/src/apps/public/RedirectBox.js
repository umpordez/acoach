import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function RedirectBox({
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

