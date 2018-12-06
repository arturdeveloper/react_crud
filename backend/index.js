const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products LIMIT 3";

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "login",
  //   insecureAuth: true,
  database: "classicmodels"
});

connection.connect(err => {
  if (err) {
    // return err;
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("go to /products to see products");
});

app.get("/products/add", (req, res) => {
  const { name, price } = req.query;
  const prodCode = "FFF_" + randomInteger(100, 999);
  //   console.log(name, price);
  const INSERT_PRODUCTS_QUERY = `
    INSERT into 
    products (productCode, productName, buyPrice, productVendor) 
    VALUES('${prodCode}', '${name}', '${price}', 'react crud app insert')
    `;
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("succesfully added product");
    }
  });
});

app.get("/products", (req, res) => {
  console.dir(connection.threadId);

  connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

app.listen(4000, () => {
  console.log("Products server listening on port ###");
});
