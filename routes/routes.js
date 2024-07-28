const express = require("express");
const router = express.Router();
const db = require("../config/db");

//
router.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome SociePay",
    layout: "layouts/main_layout",
  });
});

router.get("/shop", (req, res) => {
  res.render("shop", {
    title: "SociePay - Shop",
    layout: "layouts/main_layout",
  });
});
// Shop detail
router.get("/shop-detail", (req, res) => {
  res.render("shop-detail", {
    title: "Detail here ..",
    layout: "layouts/main_layout",
  });
});

router.get("/cart", (req, res) => {
  res.render("cart", {
    title: "Cart - ",
    layout: "layouts/main_layout",
  });
});

router.get("/checkout", (req, res) => {
  res.render("checkout", {
    title: "Checkout - Procduct",
    layout: "layouts/main_layout",
  });
});

router.get("/testimonial", (req, res) => {
  res.render("testimonial", {
    title: "Testimoni ...",
    layout: "layouts/main_layout",
  });
});
//

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Use",
    layout: "layouts/main_layout",
  });
});

// Read and display items
router.get("/tmp", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("index", { items: results });
  });
});

router.get("/data", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, result) => {
    res.json(result);
  });
});

// Create item
router.post("/add", (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO items (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Update item
router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = "UPDATE items SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Delete item
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM items WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
