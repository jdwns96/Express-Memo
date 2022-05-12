const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const Post = require("../models/post");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; // 모든 라우터에 다 들어가는 변수는 여기에 넣을수 있다. 미들웨어의 특성
  next();
});

router.route("/").get(isLoggedIn, async (req, res) => {
  const post = await Post.findAll({ where: { UserId: req.user.id } });
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
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (!post) {
    return res.redirect("/");
  }
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

router.get("/newpost/:id", isLoggedIn, async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (!post) {
    return res.redirect("/");
  }
  res.render("newpost.html", {
    title: "글쓰기",
    data: post,
  });
});

router.get("/info", isLoggedIn, async (req, res) => {
  res.render("info.html", {
    title: "정보",
    user: req.user,
  });
});

// router.get("*", (req, res) => {
//   return res.json({ name: "no page" });
// });

// app.post("/login", (req, res) => {});

module.exports = router;
