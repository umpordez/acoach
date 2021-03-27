import React from 'react';
import { Link } from 'react-router-dom';

export default function CoachClients() {
    return <main className='view'>
        <h2>Clientes</h2>

        <Link to={ '/clients/add' }>
            Adicionar cliente
        </Link>

        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
            </thead>
        </table>
    </main>;
}
