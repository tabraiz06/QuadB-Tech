// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { connectDB, Ticker } = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

const fetchAndStoreData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);
    
    await Ticker.deleteMany({});

    const tickerDocs = tickers.map((ticker) => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));

    await Ticker.insertMany(tickerDocs);
    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

// Fetch data every minute
setInterval(fetchAndStoreData, 60000);
fetchAndStoreData();

app.get("/api/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (error) {
    console.error("Error fetching tickers", error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
