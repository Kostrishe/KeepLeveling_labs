exports.seed = async function(knex) {
  await knex("map_comments").del();
  await knex("map_comments").insert([
    { map_id: 1, user_id: 2, comment: 'Love this map!', created_at: knex.fn.now() },
    { map_id: 2, user_id: 1, comment: 'Nice work!', created_at: knex.fn.now() }
  ]);
};