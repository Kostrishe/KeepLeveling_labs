exports.up = function (knex) {
  return knex.schema.createTable("map_comments", function (table) {
    table.increments("comment_id").primary();
    table
      .integer("map_id")
      .unsigned()
      .notNullable()
      .references("map_id")
      .inTable("maps");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.text("comment").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("map_comments");
};
