exports.seed = async function (knex) {
  await knex("map_files").del();
  await knex("map_files").insert([
    { map_id: 1, file_path: "/maps/map_one.zip", file_type: "zip" },
    { map_id: 2, file_path: "/maps/map_two.zip", file_type: "zip" },
  ]);
};
