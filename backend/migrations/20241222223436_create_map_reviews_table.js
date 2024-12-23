exports.up = function (knex) {
  return knex.schema
    .createTable("map_reviews", function (table) {
      table.increments("review_id").primary();
      table
        .integer("map_id")
        .unsigned()
        .notNullable()
        .references("map_id")
        .inTable("maps");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users");
      table.integer("rating").notNullable();
    })
    .then(function () {
      return knex.raw(
        `ALTER TABLE map_reviews ADD CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 5)`
      );
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("map_reviews");
};
