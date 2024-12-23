exports.seed = async function (knex) {
  await knex("map_tags").del();
  await knex("map_tags").insert([
    { map_id: 1, tag_id: 1 },
    { map_id: 2, tag_id: 2 },
  ]);
};
