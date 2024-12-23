exports.up = function (knex) {
  return knex.schema.createTable("playtest_tags", function (table) {
    table
      .integer("playtest_id")
      .unsigned()
      .notNullable()
      .references("playtest_id")
      .inTable("playtests");
    table
      .integer("tag_id")
      .unsigned()
      .notNullable()
      .references("tag_id")
      .inTable("tags");
    table.primary(["playtest_id", "tag_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("playtest_tags");
};
