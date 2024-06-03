import http from 'http';
import { route } from './route.js';

const server = http.createServer((req, res) => {
    route(req, res);
});

server.listen(7000, () => {
    console.log('Server started running...........');
});
