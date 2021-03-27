import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { randomNumber } from '../../utils';
import { getCurrentUiMode, changeUiMode } from '../../theme';

import LoginBox from './LoginBox';
import ForgetPasswordBox from './ForgetPasswordBox';

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
