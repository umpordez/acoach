const config = {};
const isDev = process.env.NODE_ENV === 'development';

if (isDev || window.location.hostname === 'localhost') {
    config.baseApiUrl = 'http://localhost:7000';
} else {

}

config.isDev = isDev;

export default config;
