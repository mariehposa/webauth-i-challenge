const express = require('express');
const helmet = require('helmet')
const bcrypt = require('bcrypt')

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.json('Its working!')
})

module.exports = server;