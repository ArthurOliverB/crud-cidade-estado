
exports.up = function(knex, Promise) {
    return knex.schema.createTable('mayors', table => {
        table.increments('id').primary()
        table.string('name', 80)
        table.date('birthdate')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mayors')
};
