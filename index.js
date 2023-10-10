'use strict';

const { createClient } = require('redis');  
const http = require('node:http');

const server = http.createServer((req, res) => {
});

const getPriceByArticul = () => {
    //request for redis
}



const main = async() => {
    const client = createClient();  
    let userSession = await client.hGetAll('user-session:123');
    console.log(JSON.stringify(userSession, null, 2));
    server.listen(8000);
};
main();