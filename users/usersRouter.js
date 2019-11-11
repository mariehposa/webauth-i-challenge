const express = require('express');

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

module.exports = router;
