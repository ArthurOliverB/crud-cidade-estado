const knexfile = require('../knexfile')
const knex = require('knex')(knexfile)

module.exports = knex

knex('cities').insert({
    name: 'Fortaleza',
    population: 200,
    state_id: 1
}).then(data => {
    console.log(data)
})