const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: ""
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("go to /products to see products");
});

app.get("/products", (req, res) => {});

app.listen(4000, () => {
  console.log("Products server listening on port ###");
});
