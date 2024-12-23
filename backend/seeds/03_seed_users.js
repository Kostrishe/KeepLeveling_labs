exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      login: "user1",
      password_hash: "hash1",
      email: "user1@example.com",
      created_at: knex.fn.now(),
    },
    {
      login: "user2",
      password_hash: "hash2",
      email: "user2@example.com",
      created_at: knex.fn.now(),
    },
    {
      login: "user3",
      password_hash: "hash3",
      email: "user3@example.com",
      created_at: knex.fn.now(),
    },
  ]);
};
