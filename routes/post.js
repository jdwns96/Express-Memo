const express = require("express");
const Post = require("../models/post");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/post", isLoggedIn, async (req, res) => {
  const { title, body } = req.body;
  try {
    await Post.create({
      title,
      content: body,
      UserId: req.user.id,
    });
    return res.status(201).end();
  } catch (e) {
    console.error(e);
    return res.status(403).end();
  }
});

router.delete("/post/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const exPost = await Post.findOne({
    where: {
      id,
      UserId: req.user.id,
    },
  });
  if (!exPost) {
    return res.status(403).end();
  }
  try {
    await Post.destroy({
      where: {
        id,
      },
    });
    return res.status(201).end();
  } catch (e) {
    console.error(e);
    return res.status(403).end();
  }
});

module.exports = router;
