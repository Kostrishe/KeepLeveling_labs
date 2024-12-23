exports.up = function (knex) {
  return knex.schema.createTable("notifications", function (table) {
    table.increments("notification_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.text("message").notNullable();
    table.boolean("is_read").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notifications");
};
