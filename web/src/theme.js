import { randomNumber } from './utils';

function saveUiMode(uiMode) {
    try {
        if (!uiMode) {
            global.localStorage.removeItem('ui_mode');
            return;
        }

        global.localStorage.setItem('ui_mode', uiMode);
    } catch(ex) {
        console.error(ex);
    }
}

function getCoolBg() {
    const degree1 = randomNumber(-200, 200);
    const degree2 = randomNumber(0, 100);

    const shape1 = randomNumber(1, 2) === 1 ? 'ellipse' : 'circle';
    const shape2 = randomNumber(1, 2) === 1 ? 'ellipse' : 'circle';

    return `
        radial-gradient(${shape1} at ${degree1}%,
            var(--main-highlight-color),
            transparent),

        radial-gradient(${shape2} at ${degree2}%,
            var(--main-bg-color),
            var(--main-bg-color));
    `;
}

function changeUiMode(uiMode) {
    const bodyElement = document.querySelector('body');

    saveUiMode(uiMode);
    bodyElement.style = `background: ${getCoolBg()};`;

    if (!uiMode) {
        bodyElement.className = '';
        return;
    }

    bodyElement.className = uiMode;
}


function getCurrentUiMode() {
    try {
        return global.localStorage.getItem('ui_mode');
    } catch(ex) {
        console.error(ex);
        return null;
    }
}

export { changeUiMode, getCurrentUiMode };
