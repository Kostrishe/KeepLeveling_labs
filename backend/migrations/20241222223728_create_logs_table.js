exports.up = function (knex) {
  return knex.schema.createTable("logs", function (table) {
    table.increments("log_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.string("action", 255).notNullable();
    table.text("details");
    table.timestamp("timestamp").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("logs");
};
