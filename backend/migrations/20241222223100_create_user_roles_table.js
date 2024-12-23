exports.up = function (knex) {
  return knex.schema.createTable("user_roles", function (table) {
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("role_id")
      .inTable("roles");
    table.primary(["user_id", "role_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_roles");
};
