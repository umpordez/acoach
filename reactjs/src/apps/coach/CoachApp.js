import React, { useContext, useEffect } from 'react';

import {
    BrowserRouter as Router, Link, Route, Switch
} from 'react-router-dom';

import { UserContext } from '../../context';
import { getCurrentUiMode, changeUiMode } from '../../theme';

import CoachHome from './CoachHome';
import CoachClientAdd from './CoachClientAdd';
import CoachClients from './CoachClients';

import ThemedApp from '../../ThemedApp';

function Logo() {
    return <h1 style={ { cursor: 'pointer' } } onClick={ () => {
        // fresh load
        window.location.href = '/';
    } } >acoach</h1>
}

function CoachApp() {
    const { setUser } = useContext(UserContext);

    return <ThemedApp>{ ({ setNextUiMode, nextModeText }) =>
        <main className='full'>
            <Router>
                <main className='body'>
                    <header>
                        <Logo />
                        <nav>
                            <ul>
                                <li><Link to={ '/' }>home</Link></li>
                                <li><Link to={ '/clients' }>clients</Link></li>

                                <li><span onClick={ () => {
                                    localStorage.clear();
                                    setUser();
                                } } className='link'>logout</span></li>
                            </ul>
                        </nav>
                    </header>

                    <Switch>
                        <Route path='/clients/add'>
                            <CoachClientAdd />
                        </Route>

                        <Route exact path='/clients'>
                            <CoachClients />
                        </Route>

                        <Route path='/'>
                            <CoachHome />
                        </Route>
                    </Switch>

                    <footer>
                        <small>
                            from <a href='https://youtube.com/c/ligeiro'>speedy</a>
                        </small>
                        <span
                            style={ { marginLeft: 'auto' } }
                            onClick={ setNextUiMode }
                            className='link small'>{ nextModeText }</span>
                    </footer>
                </main>
            </Router>
        </main> }
    </ThemedApp>
}

export default CoachApp;
