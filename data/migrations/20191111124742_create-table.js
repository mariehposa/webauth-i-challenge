
exports.up = function(knex) {
  return knex.schema
  .createTable('project1', table => {
      table.increments('id')
      table.text('name', 128)
      table.string('password', 128)
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project1')
};
