const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Started the server on PORT: ${PORT}!`);
});
