const express = require('express');
const bcrypt = require('bcrypt')
const db = require('./usersModel')
const router = express.Router()

router.get('/', restricted, (req, res) => {
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

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.json('you can not leave, actually')
        } else {
          res.json('goodbye, sad to see you go')
        }
      })
    } else {
      res.end();
    }
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

router.post('/login', (req, res) => {
    let { name, password } = req.body;


    db.getUserBy({ name })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${name} !` })

            } else {
                res.status(401).json({ message: 'Invalid Credentials!' })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    // res.status(200).json({ message: `Welcome ${name} !` })
})

function restricted (req, res, next) {
   if (req.session && req.session.user ) {
       next()
   } else {
       res.status(401).json({
           message: 'User is unauthorized'
       })
   }
}

module.exports = router;
