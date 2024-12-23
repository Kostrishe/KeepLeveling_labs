exports.seed = async function (knex) {
  await knex("tags").del();
  await knex("tags").insert([
    { tag_name: "2x2" },
    { tag_name: "5x5" },
  ]);
};
