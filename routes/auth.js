const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.route("/join").post(async (req, res) => {
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

module.exports = router;
