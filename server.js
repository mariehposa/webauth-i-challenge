const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./users/usersRouter')

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors())

server.get('/', (req, res) => {
    res.json('Its working!')
})

server.use('/api/users', userRouter);

module.exports = server;