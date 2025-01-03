exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.increments("tag_id").primary();
    table.string("tag_name", 50).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tags");
};
