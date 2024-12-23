exports.seed = async function (knex) {
  await knex("playtest_tags").del();
  await knex("playtest_tags").insert([
    { playtest_id: 1, tag_id: 1 },
    { playtest_id: 2, tag_id: 2 },
  ]);
};
