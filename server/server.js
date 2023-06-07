const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const { PORT } = require("./config");
const scrapeRoute = require("./routes/scrape");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(
  "/api/v1/uploads",
  express.static(path.join(__dirname, "../client/src/uploads"))
);
app.use("/api/v1", scrapeRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
