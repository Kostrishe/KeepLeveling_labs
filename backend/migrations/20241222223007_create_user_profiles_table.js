exports.up = function (knex) {
  return knex.schema.createTable("user_profiles", function (table) {
    table.increments("profile_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .unique()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.string("username", 50);
    table.string("first_name", 50);
    table.text("bio");
    table.string("avatar_url", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_profiles");
};
