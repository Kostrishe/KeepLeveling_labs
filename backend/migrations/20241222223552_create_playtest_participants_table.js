exports.up = function (knex) {
  return knex.schema.createTable("playtest_participants", function (table) {
    table
      .integer("playtest_id")
      .unsigned()
      .notNullable()
      .references("playtest_id")
      .inTable("playtests");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.primary(["playtest_id", "user_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("playtest_participants");
};
