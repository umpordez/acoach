import logger from './logger';
import config from './config';

async function doRequest(url, method, body, headers) {
    headers = headers || {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const jwtToken = localStorage.getItem('jwtToken');
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
                return response.json();
            }

            return response;
        }

        throw response;
    } catch (ex) {
        logger.error(ex);

        if (ex.body) {
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
