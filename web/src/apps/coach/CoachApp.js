import React, { useContext } from 'react';

import {
    BrowserRouter as Router, Link, Route
} from 'react-router-dom';

import { UserContext } from '../../context';

import CoachHome from './CoachHome';
import CoachClientAdd from './CoachClientAdd';
import CoachClients from './CoachClients';

function Logo() {
    return <h1>acoach</h1>
}

function CoachApp() {
    const { setUser } = useContext(UserContext);

    return <main className='full'>
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


                <Route path='/clients/add'>
                    <CoachClientAdd />
                </Route>

                <Route exact path='/clients'>
                    <CoachClients />
                </Route>

                <Route path='/'>
                    <CoachHome />
                </Route>

                <footer>
                    <small>from speedy</small>
                </footer>
            </main>
        </Router>
    </main>;
}

export default CoachApp;
