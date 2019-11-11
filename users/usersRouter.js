const express = require('express');
const bcrypt = require('bcrypt')
const db = require('./usersModel')
const router = express.Router()

router.get('/', (req, res) => {
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
        res.status(500).json(error);
    });
})

// router.post('/login', (req, res) => {
//     const { name, password} = req.body;

//     db.get
// })

module.exports = router;
