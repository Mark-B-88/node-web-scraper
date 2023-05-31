const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const port = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(
  "/api/v1/uploads",
  express.static(path.join(__dirname, "../client/src/uploads"))
);

// trigger the scraping
app.post("/api/v1/scrape", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    res.status(400).send("URL is required");
    return;
  }

  try {
    // puppeteer script
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();

    await browser.close();

    const outputDir = path.join(__dirname, "../client/src/uploads");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFile(path.join(outputDir, "output.html"), content, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while writing the output file");
        return;
      }

      res.json({ status: "success" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during the scraping process");
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
