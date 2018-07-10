
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cities', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('population').notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities')
};
