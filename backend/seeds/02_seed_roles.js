exports.seed = async function(knex) {
  await knex("roles").del();
  await knex("roles").insert([
    { role_name: 'Admin' },
    { role_name: 'User' }
  ]);
};