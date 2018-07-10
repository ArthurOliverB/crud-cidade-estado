
exports.up = function(knex, Promise) {
  knex.schema.createTable('states_cities')
};

exports.down = function(knex, Promise) {
  
};
