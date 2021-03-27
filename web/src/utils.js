import { useRef } from 'react';

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function useFocus() {
    const ref = useRef();
    return [ ref, () => ref.current && ref.current.focus() ];
}

export { useFocus, randomNumber };
