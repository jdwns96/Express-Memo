const express = require("express");
// const cors = require("./middleware/cors");
const page = require("./page");
const auth = require("./auth");
const post = require("./post");

const router = express.Router();

router.use("/", page);
router.use("/", auth);
router.use("/", post);

module.exports = router;
