const express = require("express"); // express
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const path = require("path"); // 경로 설정

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 8080);

app.use(morgan("dev")); // console 도구

app.use("/", express.static(path.join(__dirname, "public"))); // 정적파일 라우터
nunjucks.configure("page", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");
app.use(express.json()); //요청 처리
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "/static/index.html"));
  res.render("index.html", {
    title: "메인 화면",
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), " : server listening !!");
});
