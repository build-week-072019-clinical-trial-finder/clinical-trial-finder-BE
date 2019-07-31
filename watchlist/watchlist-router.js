const express = require("express");

const Watchlist = require("./watchlist-model");

const router = express.Router();

const restricted = require("../auth/restricted-middleware");

router.get("/watchlist", restricted, async (req, res) => {
  try {
    const watchlist = await Watchlist.findWatchlist();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to get watchlist" });
  }
});

router.get("/users/:id/watchlist", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const watchlist = await Watchlist.findWatchlistById(id);

    if (watchlist) {
      res.json(watchlist);
    } else {
      res
        .status(404)
        .json({ message: "Could not find watchlist with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get watchlist" });
  }
});

router.post("/watchlist", restricted, async (req, res) => {
  const watchlistData = req.body;

  try {
    const watchlist = await Watchlist.addWatchlist(watchlistData);
    res.status(201).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new watchlist" });
  }
});

router.delete("/watchlist/:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Watchlist.removeWatchlist(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: "Could not find watchlist with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete watchlist" });
  }
});

module.exports = router;
