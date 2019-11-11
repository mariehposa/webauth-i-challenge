const express = require('express');
const bcrypt = require('bcrypt')
const db = require('./usersModel')
const router = express.Router()

router.get('/', bodyValidator, (req, res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "Couldn't get all users" + err.message
        })
    })
})

router.post('/register', (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 12)
    const newUser = {
        name: req.body.name,
        password: hash
    };

    db.addUsers(newUser)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json(error.message);
    });
})

router.post('/login', bodyValidator, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.valUser.name} !`})
})

function bodyValidator (req, res, next) {
    let { name, password } = req.body;

    if (!name || !password) {
        name = req.headers.name
        password = req.headers.password
    }

    db.getUserBy({ name })
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.valUser = user
            next()
        } else {
            res.status(401).json({ message: 'Invalid Credentials!'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
}

module.exports = router;
