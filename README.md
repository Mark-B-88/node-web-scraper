# Node Web Scraper With Puppeteer

The original project started as vanilla javascript, but I decided to use React to handle the state changes. The **_output_** route will make a GET request to the back-end `/api/v1/uploads/output.html` to get the scraped data. The back-end will then send the data to the front-end and the front-end will render the data in the browser.

From there you can use the dev console to scrape the page.

# Simple Puppeteer Script to Scrape a Website

```javascript
const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://marcovbarrantes.me");

  const bodyHTML = await page.evaluate(() => document.body.innerHTML);

  fs.writeFile("output.html", bodyHTML, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  await browser.close();
}

run();
```

# Scrapes the Page With No Other Actions

```javascript
document.querySelector("#scrape").addEventListener("click", async () => {
  const url = document.querySelector("#url").value;

  const response = await fetch("/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (response.ok) {
    window.open("/output.html", "_blank");
  } else {
    console.error("Failed to scrape website");
  }
});
```

# Scrapes the Page and Downloads the Images

```javascript
document.querySelector("#scrape").addEventListener("click", async () => {
  const url = document.querySelector("#url").value;

  const response = await fetch("/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  // happens in DOM, not visible to user
  if (response.ok) {
    const { status } = await response.json();
    if (status === "success") {
      const link = document.createElement("a");
      link.href = "/output.html";
      link.download = "output.html";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } else {
    console.error("Failed to scrape website");
  }
});
```
