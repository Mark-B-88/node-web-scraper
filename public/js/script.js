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
    const { status } = await response.json();
    if (status === "success") {
      const link = document.createElement("a");
      link.href = "/output.html";
      link.download = "output.html";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show a success message
      const successMsg = document.createElement("p");
      successMsg.textContent = "File downloaded successfully!";
      document.body.appendChild(successMsg);

      // Show the output button
      document.querySelector("#output").style.display = "block";
    }
  } else {
    console.error("Failed to scrape website");
  }
});

// output button
document.querySelector("#output").addEventListener("click", () => {
  window.open("/output.html", "_blank");
});
