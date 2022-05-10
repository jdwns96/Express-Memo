const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.render("index.html", {
    title: "메모장",
  });
});

router.route("/login").get((req, res) => {
  res.render("login.html", {
    title: "로그인",
  });
});

router.route("/join").get((req, res) => {
  res.render("join.html", {
    title: "회원가입",
  });
});

// app.post("/login", (req, res) => {});

module.exports = router;
