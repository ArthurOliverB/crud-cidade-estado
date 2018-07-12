
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cities', table => {
        table.increments('id').primary()
        table.string('name', 80).notNullable()
        table.integer('population').notNullable()
        table.integer('state_id').unsigned().notNullable()
        table.foreign('state_id').references('id').inTable('states')
        
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities')
};
