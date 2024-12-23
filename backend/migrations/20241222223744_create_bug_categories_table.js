exports.up = function (knex) {
  return knex.schema.createTable("bug_categories", function (table) {
    table.increments("category_id").primary();
    table.string("category_name", 50).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("bug_categories");
};
