const express = require('express');
const helmet = require('helmet')
// const bcrypt = require('bcrypt')
const userRouter = require('./users/usersRouter')

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.json('Its working!')
})

server.use('/api/users', userRouter);

module.exports = server;