
exports.up = function(knex, Promise) {
  return knex.schema.table('cities', table => {
      table.integer('mayor_id').unique().unsigned().notNullable()
      table.foreign('mayor_id').references('id').inTable('mayors')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('cities', table => {
        table.dropColumn('mayor_id')
    })
};
