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

function isEmailInvalid(errorMessage) {
    return /mail/.test(errorMessage) || notFoundMessages.includes(errorMessage);
}

function isPasswordInvalid (errorMessage) {
    return/senha/.test(errorMessage) || notFoundMessages.includes(errorMessage);
}

const validations = {
    notFoundMessages,
    email: isEmailInvalid,
    password: isPasswordInvalid
};

export { useFocus, randomNumber, validations };
