const db = require('../data/dbConfig')

function getUsers() {
    return db('project1')
}

function getUserId(id) {
    return db('project1 as p')
    .where('p.id', id)
    .first()
}

function addUsers(user) {
    return db('project1 as p')
    .insert(user)
    .then(([id]) => this.getUserId(id))
}

module.exports = {
    getUsers,
    getUserId,
    addUsers
}