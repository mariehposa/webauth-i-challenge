const db = require('../data/dbConfig')

function getUsers() {
    return db('project1')
    .select('id', 'name', 'password')
}

function getUserBy (user) {
    return db('project1')
    .where(user)
    .first()
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
    getUserBy,
    getUserId,
    addUsers
}