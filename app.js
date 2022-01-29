import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello from Node via nginx</h1>");
});

app.listen(port);
