import React from 'react';
import { Link } from 'react-router-dom';

export default function CoachClients() {
    return <main className='view'>
        <header>
            <h2>Clientes</h2>

            <Link className='btn' to={ '/clients/add' }>
                Adicionar cliente
            </Link>
        </header>

        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Deividy Metheler</td>
                    <td>deividyz@gmail.com</td>
                    <td>a</td>

                </tr>
            </tbody>
        </table>
    </main>;
}
