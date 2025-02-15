const express = require("express");
const app= express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.json());

app.get("/", (req, res) => {
    url = location.href;
    res.sendFile(__dirname, "/public/index.html"); // fs를 안 써도 fs모듈 사용
});

app.get("/play", (req, res) => {
    console.log("href 통한 이동");
    res.sendFile(__dirname, "/public/play.html"); // fs를 안 써도 fs모듈 사용
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
