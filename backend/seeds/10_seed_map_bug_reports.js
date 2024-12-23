exports.seed = async function (knex) {
  await knex("map_bug_reports").del();
  await knex("map_bug_reports").insert([
    {
      map_id: 1,
      user_id: 2,
      description: "Some bugs found",
      created_at: knex.fn.now(),
    },
    {
      map_id: 2,
      user_id: 1,
      description: "Minor issues",
      created_at: knex.fn.now(),
    },
  ]);
};
