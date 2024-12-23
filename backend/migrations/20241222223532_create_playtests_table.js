exports.up = function (knex) {
  return knex.schema.createTable("playtests", function (table) {
    table.increments("playtest_id").primary();
    table.string("title", 100).notNullable();
    table.text("description");
    table
      .integer("author_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.date("date").notNullable();
    table.integer("participants_count").notNullable();
    table.string("participant_level", 50);
    table
      .integer("server_id")
      .unsigned()
      .references("server_id")
      .inTable("servers");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("playtests");
};
