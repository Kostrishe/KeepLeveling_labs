exports.up = function (knex) {
  return knex.schema.createTable("servers", function (table) {
    table.increments("server_id").primary();
    table.specificType("ip_address", "inet").notNullable();
    table.string("location", 100).notNullable();
    table
      .integer("status_id")
      .unsigned()
      .notNullable()
      .references("status_id")
      .inTable("server_status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("servers");
};
