exports.seed = async function (knex) {
  await knex("server_status").del();
  await knex("server_status").insert([
    { status_name: "Занят" },
    { status_name: "Не занят" },
  ]);
};
