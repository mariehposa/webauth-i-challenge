const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('./users/usersRouter')

const sessionConfig = {
    name: 'session',
    secret: 'make it a little long and keep it safe!',
    cookie: {
        maxAge: 1000 * 60 * 60, // you need it if the cookie is to survive !!
        secure: false, // with secure, the cookie only gets set when https !!
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
}

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors())
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.json('Its working!')
})

server.use('/api/users', userRouter);

module.exports = server;