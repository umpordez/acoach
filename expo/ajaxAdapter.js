import logger from './logger';
import config from './config';

import { get, save } from './db/SecureStore';

async function doRequest(url, method, body, headers) {
    headers = headers || {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const jwtToken = await get('jwtToken');
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    const errorStack = new Error();

    try {
        const response = await fetch(`${config.baseApiUrl}${url}`, {
            method: method.toUpperCase(),
            headers,
            body: JSON.stringify(body)
        });

        if (response.ok) {
            if (/json/.test(headers.Accept)) {
                const json = await response.json();

                if (json.token) {
                    await save('jwtToken', json.token);

                    await save('user', JSON.stringify(json.user));
                    await save('account', JSON.stringify(json.account));
                    await save('role', json.role);
                }

                return json;
            }

            return response;
        }

        throw response;
    } catch (ex) {
        logger.error(ex);

        if (ex.headers && !ex.bodyUsed) {
            try {
                ex.message = (await ex.json()).message;
            } catch(err) {
                logger.error(err);
            }
        }

        errorStack.message = ex.message || ex.statusText;
        throw errorStack;
    }
}

const ajaxAdapter = { request: doRequest };
for (const httpMethod of [ 'get', 'post', 'put', 'delete' ]) {
    ajaxAdapter[httpMethod] = (url, body, headers) => doRequest(
        url, httpMethod, body, headers
    );
}

export default ajaxAdapter;
