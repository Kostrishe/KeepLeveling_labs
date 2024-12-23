exports.seed = async function (knex) {
  await knex("playtests").del();
  await knex("playtests").insert([
    {
      title: "Playtest One",
      description: "First playtest",
      author_id: 1,
      date: "2023-10-01",
      participants_count: 10,
      participant_level: "Beginner",
      server_id: 1,
    },
    {
      title: "Playtest Two",
      description: "Second playtest",
      author_id: 2,
      date: "2023-10-15",
      participants_count: 15,
      participant_level: "Intermediate",
      server_id: 2,
    },
  ]);
};
