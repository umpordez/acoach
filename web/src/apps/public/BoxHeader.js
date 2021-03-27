import React from 'react';

export default function BoxHeader({ errorMessage, children }) {
    if (errorMessage) {
        return <header>
            <h2>{ errorMessage }</h2>
        </header>;
    }

    return <header>
        <h2>{ children }</h2>
    </header>
}
