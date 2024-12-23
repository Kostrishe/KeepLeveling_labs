exports.seed = async function(knex) {
  await knex("user_roles").del();
  await knex("user_roles").insert([
    { user_id: 1, role_id: 1 },
    { user_id: 2, role_id: 2 }
  ]);
};