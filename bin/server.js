'use strict';

const app = require('../src/app');
const http = require('http');
const port = normalizePort(process.env.PORT || 3000);
const debug = require('debug');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log("API online port:", port);

server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);



function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
}

function onClose() {
    console.log("obrigado por utilizar a melhor api do planeta brasil");
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug("listening on:", bind);

}