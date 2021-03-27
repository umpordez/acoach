import { useRef } from 'react';

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function useFocus() {
    const ref = useRef();
    return [ ref, () => ref.current && ref.current.focus() ];
}

const notFoundMessages = [
    'Sorry, no matches.',
    'User + Password did not work',
    'WRONG!',
    'E-mail ou senha errado.',
    'Dados inválidos.'
];

const validations = {
    notFoundMessages,

    email(email) { return /\S+@\S+\.\w$/.test(email); },
    password(pass) { return pass.length > 3; }
};

export { useFocus, randomNumber, validations };
