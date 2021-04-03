import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginBox from './LoginBox';
import ForgetPasswordBox from './ForgetPasswordBox';
import SignUpBox from './SignUpBox';
import ThemedApp from '../../ThemedApp';

function PublicApp() {
    return <ThemedApp>{ ({ setNextUiMode, nextModeText }) =>
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path='/login'>
                        <LoginBox />
                    </Route>

                    <Route path='/forget'>
                        <ForgetPasswordBox />
                    </Route>

                    <Route path='/sign-up'>
                        <SignUpBox />
                    </Route>

                    <Route path='/'>
                        <LoginBox />
                    </Route>
                </Switch>
            </Router>

            <footer>
                <span
                    onClick={ setNextUiMode }
                    className='link small'>{ nextModeText }</span>
            </footer>
        </React.Fragment>
    }</ThemedApp>
}

export default PublicApp;
