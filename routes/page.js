const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.route("/").get(isLoggedIn, (req, res) => {
  console.log(req.session);
  res.render("index.html", {
    title: "메모장",
  });
});

router.route("/login").get(isNotLoggedIn, (req, res) => {
  res.render("login.html", {
    title: "로그인",
  });
});

router.route("/join").get(isNotLoggedIn, (req, res) => {
  res.render("join.html", {
    title: "회원가입",
  });
});

// app.post("/login", (req, res) => {});

module.exports = router;
