const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const Post = require("../models/post");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; // 모든 라우터에 다 들어가는 변수는 여기에 넣을수 있다. 미들웨어의 특성
  next();
});

router.route("/").get(isLoggedIn, async (req, res) => {
  const post = await Post.findAll({ where: { id: req.user.id } });
  console.log(post);
  res.render("index.html", {
    title: "메모장",
    datas: post,
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

router.route("/post/:id").get(isLoggedIn, async (req, res) => {
  const post = await Post.findOne({ where: { UserId: req.params.id } });
  console.log(post);
  res.render("post.html", {
    title: "메모장",
    post: post,
  });
});

router.get("/newpost", isLoggedIn, async (req, res) => {
  res.render("newpost.html", {
    title: "글쓰기",
  });
});

// app.post("/login", (req, res) => {});

module.exports = router;
