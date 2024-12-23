exports.seed = async function (knex) {
  await knex("playtest_participants").del();
  await knex("playtest_participants").insert([
    { playtest_id: 1, user_id: 2 },
    { playtest_id: 2, user_id: 1 },
  ]);
};
