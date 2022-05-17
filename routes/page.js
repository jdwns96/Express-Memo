const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const Post = require("../models/post");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user; // 모든 라우터에 다 들어가는 변수는 여기에 넣을수 있다. 미들웨어의 특성
  next();
});

router.get("/", isLoggedIn, async (req, res) => {
  let page = req.query.page || 1; // 페이지 가 없을 경우 page == 1

  let limit = 5;
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }
  try {
    // 페이지 전체 조회 (길이)
    const Posts = await Post.findAll({
      where: { UserId: req.user.id },
    });
    let allPostCnt = Posts.length;
    // 선택된 페이지 조회
    const post = await Post.findAll({
      where: { UserId: req.user.id },
      order: [["id", "DESC"]],
      offset,
      limit,
    });
    const totalPage = Math.ceil(allPostCnt === 0 ? 1 : allPostCnt / limit);

    if (Number(page) < 1) return res.redirect("/"); // 만약 0보다 작을 경우
    if (totalPage === 1 && Number(page) > 1) return res.redirect("/"); // 전체 페이지가 1일 경우
    if (totalPage !== 1 && Number(page) > totalPage) return res.redirect("/"); // 전체 페이지보다 넘어가는 경우

    res.render("index.html", {
      title: "메모장",
      datas: post,
      page,
      totalPage,
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login.html", {
    title: "로그인",
  });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join.html", {
    title: "회원가입",
  });
});

router.get("/post/:id", isLoggedIn, async (req, res) => {
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
