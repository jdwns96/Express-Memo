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
// 넌적스 템플릿 엔진
nunjucks.configure("page", {
  autoescape: true,
  express: app,
});
app.set("view engine", "html");

app.use(express.json()); // body 정보 처리
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 해석기
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
); // 세션 처리기

app.get("/", (req, res) => {
  res.render("index.html", {
    title: "메모장",
  });
});

app.get("/login", (req, res) => {
  res.render("login.html", {
    title: "로그인",
  });
});

app.post("/login", (req, res) => {});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), " : server listening !!");
});
