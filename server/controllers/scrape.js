const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function scrapePage(req, res) {
  const url = req.body.url;
  if (!url) {
    res.status(400).send("URL is required");
    return;
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();

    await browser.close();

    const outputDir = path.join(__dirname, "../../client/src/uploads");

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
}

module.exports = { scrapePage };
