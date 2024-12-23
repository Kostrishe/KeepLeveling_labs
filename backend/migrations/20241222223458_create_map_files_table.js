exports.up = function (knex) {
  return knex.schema.createTable("map_files", function (table) {
    table.increments("file_id").primary();
    table
      .integer("map_id")
      .unsigned()
      .notNullable()
      .references("map_id")
      .inTable("maps");
    table.string("file_path", 255).notNullable();
    table.string("file_type", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("map_files");
};
