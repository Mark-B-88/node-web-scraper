const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// trigger the scraping
app.post("/scrape", async (req, res) => {
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

    fs.writeFile(
      path.join(__dirname, "public", "output.html"),
      content,
      (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("An error occurred while writing the output file");
          return;
        }

        res.json("Scraping completed successfully");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during the scraping process");
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
