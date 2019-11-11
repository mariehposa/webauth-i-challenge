
exports.seed = function(knex) {
  return knex('project1').insert([
    {name: 'Maryam', password: 'maryam'},
    {name: 'mimi', password: 'mimi'},
    {name: 'nathan', password: 'nathan'}
  ]);
};
