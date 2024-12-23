exports.up = function (knex) {
  return knex.schema.createTable("maps", function (table) {
    table.increments("map_id").primary();
    table.string("title", 100).notNullable();
    table.text("description");
    table
      .integer("author_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("maps");
};
