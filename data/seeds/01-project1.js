
exports.seed = function(knex) {
  return knex('table_name').insert([
    {name: 'Maryam', password: 'maryam'},
    {name: 'mimi', password: 'mimi'},
    {name: 'nathan', password: 'nathan'}
  ]);
};
