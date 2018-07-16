
exports.up = function(knex, Promise) {
  return knex.schema.createTable('branch_offices', table => {
      table.increments('id').primary()
      
      table.string('address', 80).notNullable()
      
      table.integer('city_id').unsigned().notNullable()
      table.foreign('city_id').references('id').inTable('cities')

      table.integer('company_id').unsigned().notNullable()
      table.foreign('company_id').references('id').inTable('companies')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('branch_offices')
};
