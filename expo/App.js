import React, { useContext } from 'react';

import { useFonts } from 'expo-font';
import { Nunito_200ExtraLight } from '@expo-google-fonts/nunito';
import { Halant_700Bold } from '@expo-google-fonts/halant';

import { ThemeProvider } from './theme';
import MainAppLoading from './components/MainAppLoading';

import PublicApp from './apps/public/PublicApp';
import CoachApp from './apps/coach/CoachApp';
import OverlordApp from './apps/overlord/OverlordApp';
import ClientApp from './apps/client/ClientApp';

import { AppearanceProvider } from 'react-native-appearance';
import { UserProvider, UserContext } from './context';

global.error = (err) => {
    alert(err.message || err);
};

function AppSelector() {
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

export default function App() {
    const [ fontsLoaded ] = useFonts({
        Nunito_200ExtraLight,
        Halant_700Bold
    });

    if (!fontsLoaded) { return <MainAppLoading />; }

    return <AppearanceProvider>
        <ThemeProvider>
            <UserProvider>
                <AppSelector />
            </UserProvider>
        </ThemeProvider>
    </AppearanceProvider>;
}
