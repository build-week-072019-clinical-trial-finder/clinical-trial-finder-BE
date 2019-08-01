exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
    })
    .createTable("watchlist", watchlist => {
      watchlist.increments();
      watchlist.string("agency");
      watchlist.string("brief_title");
      watchlist.string("official_title");
      watchlist.string("brief_summary");
      watchlist.string("city");
      watchlist.string("state");
      watchlist.string("country");
      watchlist.string("eligibility");
      watchlist.string("gender");
      watchlist.string("condition");
      watchlist.string("keyword");
      watchlist.string("mesh_term");
      watchlist.string("overall_status");
      watchlist.string("phase");
      watchlist.string("url");
      watchlist
        .integer("users_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("watchlist");
};
