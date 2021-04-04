import { randomNumber } from './utils';
import { useTheme } from './theme';

let isInCrazyMode = false;
let isFirstChange = true;

const intervals = [];
function ThemedApp({ children }) {
    const { mode, toggleTheme } = useTheme();
    const nextModeText = mode === 'light' ? 'dark theme' : 'light theme';

    function setNextUiMode() {
        toggleTheme();

        if (!isFirstChange && (
            isInCrazyMode || randomNumber(250, 500) === 420)
        ) {
            isInCrazyMode = true;
            intervals.push(setInterval(() => { toggleTheme(); }, 500));

            setTimeout(() => {
                if (!isInCrazyMode) { return; }

                isInCrazyMode = false;
                alert('ENOUGH.');

                let idx = intervals.length;
                while(idx--) {
                    clearInterval(intervals.splice(idx, 1)[0]);
                }
            }, 5000);
            return;
        }

        isFirstChange = true;
    }

    return children({ nextModeText, setNextUiMode });
}

export default ThemedApp;
