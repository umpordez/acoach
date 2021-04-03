import { randomNumber } from './utils';
import { useTheme } from './theme';

let isInCrazyMode = false;
const intervals = [];
function ThemedApp({ children }) {
    const { mode, toggleTheme } = useTheme();
    const nextModeText = mode === 'light' ? 'dark side' : 'contrast mode';

    function setNextUiMode() {
        toggleTheme();

        if (isInCrazyMode || randomNumber(250, 500) === 420) {
            isInCrazyMode = true;
            intervals.push(setInterval(() => { toggleTheme(); }, 500));

            setTimeout(() => {
                alert('ENOUGH.');
                isInCrazyMode = false;

                let idx = intervals.length;
                while(idx--) {
                    clearInterval(intervals.splice(idx, 1)[0]);
                }
            }, 5000);
            return;
        }
    }

    return children({ nextModeText, setNextUiMode });
}

export default ThemedApp;
