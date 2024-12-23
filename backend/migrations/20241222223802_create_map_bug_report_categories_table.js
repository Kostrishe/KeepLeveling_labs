exports.up = function (knex) {
  return knex.schema.createTable("map_bug_report_categories", function (table) {
    table
      .integer("bug_report_id")
      .unsigned()
      .notNullable()
      .references("bug_report_id")
      .inTable("map_bug_reports");
    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("category_id")
      .inTable("bug_categories");
    table.primary(["bug_report_id", "category_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("map_bug_report_categories");
};
