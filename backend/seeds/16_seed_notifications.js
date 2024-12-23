exports.seed = async function (knex) {
  await knex("notifications").del();
  await knex("notifications").insert([
    {
      user_id: 1,
      message: "Your playtest is scheduled for tomorrow.",
      is_read: false,
      created_at: knex.fn.now(),
    },
    {
      user_id: 2,
      message: "New map available for review.",
      is_read: false,
      created_at: knex.fn.now(),
    },
  ]);
};
