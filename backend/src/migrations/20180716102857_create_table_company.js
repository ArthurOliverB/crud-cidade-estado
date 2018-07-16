
exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', table => {
      table.increments('id').primary()
      table.string('name', 80)
      table.string('website', 80)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies')
};
