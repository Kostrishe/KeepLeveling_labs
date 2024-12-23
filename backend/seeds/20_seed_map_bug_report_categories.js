exports.seed = async function (knex) {
  await knex("map_bug_report_categories").del();
  await knex("map_bug_report_categories").insert([
    { bug_report_id: 1, category_id: 1 },
    { bug_report_id: 2, category_id: 2 },
  ]);
};
