exports.seed = async function (knex) {
  await knex("logs").del();
  await knex("logs").insert([
    {
      user_id: 1,
      action: "Login",
      details: "User logged in successfully",
      timestamp: knex.fn.now(),
    },
    {
      user_id: 2,
      action: "Create Map",
      details: "Created a new map",
      timestamp: knex.fn.now(),
    },
  ]);
};
