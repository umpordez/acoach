import React, { useContext } from 'react';

import PublicApp from './apps/public/PublicApp';
import CoachApp from './apps/coach/CoachApp';
import OverlordApp from './apps/overlord/OverlordApp';
import ClientApp from './apps/client/ClientApp';

import { UserProvider, UserContext } from './context';
import './styles/main.scss';
import logger from './logger';

global.error = (ex) => {
    logger.error(ex);
    alert(ex.message);
};

function App() {
    const { user } = useContext(UserContext);

    if (user && user.role === 'coach') {
        return <CoachApp />
    }

    if (user && user.role === 'client') {
        return <ClientApp />
    }

    if (user && user.role === 'overlord') {
        return <OverlordApp />
    }

    return <PublicApp />
}

function Wrapper() { return <UserProvider><App /></UserProvider>; }
export default Wrapper;
