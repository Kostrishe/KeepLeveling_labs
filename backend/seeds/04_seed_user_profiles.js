exports.seed = async function (knex) {
  await knex("user_profiles").del();
  await knex("user_profiles").insert([
    {
      user_id: 1,
      username: "username1",
      first_name: "John",
      bio: "Game developer",
      avatar_url: "http://example.com/avatar1.jpg",
    },
    {
      user_id: 2,
      username: "username2",
      first_name: "Jane",
      bio: "Gamer",
      avatar_url: "http://example.com/avatar2.jpg",
    },
  ]);
};
