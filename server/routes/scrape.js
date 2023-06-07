const express = require("express");
const router = express.Router();
const { scrapePage } = require("../controllers/scrape");

router.post("/scrape", scrapePage);

module.exports = router;
