import React from 'react';

import {
    BrowserRouter as Router, Link
} from 'react-router-dom';

function Sidebar() {
    return <aside>
        <nav>
            <ul>
                <li><Link to={ '/home' }>home</Link></li>
                <li><Link to={ '/clients' }>clients</Link></li>
            </ul>
        </nav>
    </aside>;
}


function Logo() {
    return <h1>acoach</h1>
}

function CoachApp() {
    return <main className='full'>
        <Router>
            <Sidebar />

            <main className='body'>
                <header>
                    <Logo />
                    <nav>
                        <ul>
                            <li>@deividy</li>
                        </ul>
                    </nav>
                </header>

                <footer>

                </footer>
            </main>
        </Router>
    </main>;
}

export default CoachApp;
