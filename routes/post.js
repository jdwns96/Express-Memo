const express = require("express");
const Post = require("../models/post");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/post", isLoggedIn, async (req, res, next) => {
  const { title, body } = req.body;
  try {
    // return res.redirect("/login");
    await Post.create({
      title,
      content: body,
      UserId: req.user.id,
    });
    return res.redirect("/");
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
