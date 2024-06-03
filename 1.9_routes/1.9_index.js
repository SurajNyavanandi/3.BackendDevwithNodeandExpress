import http from 'http';
import { route } from './1.9_routes.js';

const server = http.createServer((req, res) => {
    route(req, res);
});

server.listen(5000, () => {
    console.log('Server started running...........');
});
