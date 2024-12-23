exports.seed = async function (knex) {
  await knex("maps").del();
  await knex("maps").insert([
    {
      map_id: "1",
      title: "Ferlin",
      description: "First map for testing",
      author_id: "1",
      created_at: knex.fn.now(),
    },
    {
      map_id: "2",
      title: "Citadel",
      description: "Second map for testing",
      author_id: "2",
      created_at: knex.fn.now(),
    },
  ]);
};
