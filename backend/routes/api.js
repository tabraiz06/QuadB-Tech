const express = require("express");
const Ticker = require("../model/tickerModel");
const router = express.Router();
router.get("/api/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (error) {
    console.error("Error fetching tickers", error);
    res.status(500).send("Server error");
  }
});
module.exports = router;
