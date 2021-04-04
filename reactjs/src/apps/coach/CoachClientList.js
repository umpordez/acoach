import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

export default function CoachClients() {
    const [ page, setPage ] = useState(1);
    const [ clients, setClients ] = useState({ list: [], total: 0 });

    return <main className='view'>
        <header>
            <h2>Clientes</h2>

            <Link className='btn' to={ '/clients/add' }>
                Adicionar cliente
            </Link>
        </header>

        { clients.total === 0 ?
            <p>Nenhum cliente cadastrado, <Link to={ '/clients/add'
            }>clique aqui</Link> para cadastrar.</p>
        : <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th style={ { width: 60 } }>&nbsp;</th>
                </tr>
            </thead>

            <tbody>
                { clients.list.map((c) => <tr key={ c.id }>
                    <td>{ c.name }</td>
                    <td>{ c.email }</td>
                    <td>
                        <div className='fa-icon-wrapper'>
                            <div className='fa-icon'>
                                <Link to={ `/client/${c.id}/edit` }>
                                    <FontAwesomeIcon icon={ faEdit } />
                                </Link>
                            </div>
                            <div className='fa-icon'>
                                <span className='link'>
                                    <FontAwesomeIcon icon={ faTrash } />
                                </span>
                            </div>
                        </div>
                    </td>
                </tr> )}
            </tbody>
        </table> }
    </main>;
}
