exports.seed = async function (knex) {
  await knex("bug_categories").del();
  await knex("bug_categories").insert([
    { category_name: "Графический баг" },
    { category_name: "Технический баг" },
  ]);
};
