import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Appearance } from 'react-native-appearance';

const defaultMode = Appearance.getColorScheme() || 'light';

const ThemeContext  = createContext();
const baseTheme = {
    textFontSize: 16,
    h3FontSize: 18,
    h2FontSize: 20,
    h1FontSize: 22,

    headingFontFamily: 'Halant_700Bold',
    textFontFamily: 'Nunito_200ExtraLight',

    input: {
        height: 40,
        padding: 5,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 4
    }
};

const themes = {
    default: {
        mainBackgroundColor: '#ffffff',
        mainTextColor: '#222222',
        inputPlaceholderTextColor: '#C4C2C0',
        mainBorderColor: '#D4D2D0'
    },

    defaultDark: {
        mainBackgroundColor: '#000',
        mainTextColor: '#F4F2F0',
        inputPlaceholderTextColor: '#C4C4C4',
        mainBorderColor: '#D4D4D4'
    }
};

function ThemeProvider({ children }) {
    const [ themeName, setTheme ] = useState('default');
    const [ mode, setMode ] = useState(defaultMode);

    const modeName = mode === 'light' ? '' : 'Dark';
    const theme = {
        ...baseTheme,
        ...themes[`${themeName}${modeName}`]
    };

    useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            setMode(colorScheme);
        });

        return () => sub.remove();
    });

    function toggleTheme() {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    return <ThemeContext.Provider value={ {
        theme,
        themeName,
        mode,
        setMode,
        setTheme,
        toggleTheme
    } }>{ children }</ThemeContext.Provider>;
}

ThemeProvider.propTypes = { children: PropTypes.any };

function useTheme() {
    return useContext(ThemeContext);
}

export { useTheme, ThemeProvider, ThemeContext };
