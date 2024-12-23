exports.up = function (knex) {
  return knex.schema.createTable("map_bug_reports", function (table) {
    table.increments("bug_report_id").primary();
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
    table.text("description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("map_bug_reports");
};
