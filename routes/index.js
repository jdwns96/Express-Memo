const express = require("express");
// const cors = require("./middleware/cors");
const page = require("./page");
const auth = require("./auth");
const post = require("./post");
const info = require("./info");

const router = express.Router();

router.use(page);
router.use(auth);
router.use(post);
router.use(info);

module.exports = router;
