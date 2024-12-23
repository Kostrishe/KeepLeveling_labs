exports.up = function (knex) {
  return knex.schema.createTable("map_tags", function (table) {
    table
      .integer("map_id")
      .unsigned()
      .notNullable()
      .references("map_id")
      .inTable("maps");
    table
      .integer("tag_id")
      .unsigned()
      .notNullable()
      .references("tag_id")
      .inTable("tags");
    table.primary(["map_id", "tag_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("map_tags");
};
