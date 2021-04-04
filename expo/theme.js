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
    buttonFontFamily: 'Nunito_200ExtraLight',
    textFontFamily: 'Nunito_200ExtraLight',

    input: {
        height: 40,
        padding: 5,
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 4
    },

    button: {
        borderRadius: 4,
        padding: 10,
        borderWidth: 1,
        alignItems: 'center'
    },

    buttonText: {

    }
};

const themes = {
    default: {
        mainBackgroundColor: '#ffffff',
        mainTextColor: '#222222',
        mainBorderColor: '#D4D2D0',
        mainHighlightColor: '#0066cc',

        tabBar: {
            activeTintColor: '#111',
            activeBackgroundColor: '#ffffff',
            inactiveTintColor: '#D4D2D0',
            inactiveBackgroundColor: '#ffffff',
        },

        buttonColors: {
            default: {
                background: '#F4F2F0',
                text: '#000',
                border: '#D4D2D0'
            }

        },

        inputColors: {
            background: '#F4F2F0',
            text: '#000',
            placeholderTextColor: '#C4C2C0',

            backgroundInvalid: '#F4F2F0',
            textInvalid: 'red',
            borderInvalid: 'red',
        }
    },

    defaultDark: {
        mainBackgroundColor: '#000',
        mainTextColor: '#F4F2F0',
        mainBorderColor: '#D4D4D4',
        mainHighlightColor: '#99ccff',

        tabBar: {
            activeTintColor: '#FFF',
            activeBackgroundColor: '#000',
            inactiveTintColor: '#333',
            inactiveBackgroundColor: '#000',
        },

        buttonColors: {
            default: {
                background: '#444',
                text: '#F4F2F0',
                border: '#424242'
            }
        },

        inputColors: {
            background: '#444',
            text: '#F4F2F0',
            placeholderTextColor: '#C4C4C4',

            backgroundInvalid: '#444',
            textInvalid: 'red',
            borderInvalid: 'red',
        }
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
