exports.up = function (knex) {
  return knex.schema.createTable("server_status", function (table) {
    table.increments("status_id").primary();
    table.string("status_name", 50).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("server_status");
};
