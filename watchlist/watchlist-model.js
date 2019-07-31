const db = require("../database/dbConfig");

module.exports = {
  addWatchlist,
  findWatchlist,
  removeWatchlist,
  findWatchlistById
};

function findWatchlist() {
  return db("watchlist");
}

function addWatchlist(watchlist) {
  return db("watchlist").insert(watchlist, "id");
}

function removeWatchlist(id) {
  return db("watchlist")
    .where({ id })
    .del();
}

function findWatchlistById(id) {
  return db("watchlist").where({ users_id: id });
}
