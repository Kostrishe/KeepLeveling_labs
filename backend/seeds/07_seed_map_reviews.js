exports.seed = async function (knex) {
  await knex("map_reviews").del();
  await knex("map_reviews").insert([
    { map_id: 1, user_id: 2, rating: 5 },
    { map_id: 2, user_id: 1, rating: 4 },
  ]);
};
