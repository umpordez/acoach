import { useState, useEffect } from 'react';
import { randomNumber } from './utils';
import { getCurrentUiMode, changeUiMode } from './theme';

let isInCrazyMode = false;
function ThemedApp({ children }) {
    const [ uiMode, setUiMode ] = useState(getCurrentUiMode());

    useEffect(() => {
        changeUiMode(uiMode);
    });

    const nextModeText = uiMode ? 'light theme' : 'dark theme';
    const nextUiMode = uiMode ? null : 'contrast';

    function setNextUiMode() {
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
            const element = document.querySelector('#root > footer');

            if (!element) {
                isInCrazyMode = true;
                return;
            }

            element.innerHTML = `
                <span class='small'>aaaaand, it's gone.</span>
            `;
        }
    }

    return children({
        uiMode,
        nextModeText,
        nextUiMode,
        setUiMode,
        setNextUiMode
    });
}

export default ThemedApp;
