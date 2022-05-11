const express = require("express");
const Post = require("../models/post");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/post", isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
    });
    return res.redirect("/login");
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
