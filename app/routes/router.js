const express = require("express");
const path = require("path");
let bcrypt = require("bcryptjs");
const validation = require("../controllers/validate");
let sql = require("../models/db.config");
const app = express();

let momnet;
let date = new Date();
let time = date.getHours();
app.get("/", (req, res) => {
  if (time > 12) {
    momnet = "Good Afternoon";
  } else {
    momnet = "Good Morning";
  }
  res.render("index", { momnet });
});
app.get("/index", (req, res) => {
  res.render("index", { momnet });
});
app.get("/product", (req, res) => {
  res.render("product");
});
app.get("/about/:id", (req, res) => {
  res.render("about", { title: "About Us" });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/blog", (req, res) => {
  res.render("blog");
});
app.get("/login", (req, res) => {
  res.render("login", { error: "INVALID INPUTS" });
});

app.post("/login", (req, res) => {
  //CRUD
  let { email, username, pass } = req.body;
  let { error } = validation(req.body);
  if (error) {
    console.log(error.details[0]["message"]);
    res.redirect("back");
  }
  sql.query(
    "CREATE TABLE IF NOT EXISTS `user`(`id` int(11) NOT NULL AUTO_INCREMENT, `email` text(1000) NOT NULL, `userName` text(1000) NOT NULL, `password` text(1000) NOT NULL, PRIMARY KEY(`id`))",
    (error, result) => {
      if (error) {
        console.log("error", error);
      } else {
        sql.query("SELECT * FROM user WHERE email=? ", [email], (rrr, ress) => {
          if (
            ress === undefined ||
            ress.length == 0 ||
            !Array.isArray(ress) ||
            !ress.length
          ) {
            bcrypt.hash(pass, 8, (Err, hash) => {
              console.log(hash);
              if (Err) {
                console.log(Err);
              } else {
                sql.query(
                  "INSERT INTO user(email, userName, password) VALUES(?,?,?)",
                  [email, username, hash],
                  (err, respo) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.redirect("/");
                    }
                  }
                );
              }
            });
          } else {
            res.redirect("back");
          }
        });
      }
    }
  );
});
module.exports = app;
