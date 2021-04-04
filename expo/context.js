import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { get } from './db/SecureStore';
import logger from './logger';

const UserContext = createContext();

async function getUserFromStore() {
    try {
        const userFromLocalStorageString = await get('user');

        if (userFromLocalStorageString) {
            const userFromLocalStorage = JSON.parse(userFromLocalStorageString);
            const account = JSON.parse(await get('account'));
            const role = await get('role');

            userFromLocalStorage.account = account;
            userFromLocalStorage.role = role;

            return userFromLocalStorage;
        }
    } catch(ex) {
        logger.error(ex);
    }

    return null;
}

function UserProvider({ children }) {
    const [ user, setUser ] = useState();

    useMemo(async() => {
        setUser(await getUserFromStore());
    });

    return <UserContext.Provider value={ {
        user,
        async setUser(_user) {
            if (_user) { return setUser(_user); }

            setUser(await getUserFromStore());
        }
    } }>
        { children }
    </UserContext.Provider>;
}

UserProvider.propTypes = { children: PropTypes.any };

export { UserProvider, UserContext };
