const express = require("express");
// const cors = require("./middleware/cors");
const page = require("./page");
const auth = require("./auth");

const router = express.Router();

router.use("/", page);
router.use("/", auth);

module.exports = router;
