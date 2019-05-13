const express = require('express');
const hbs = require('hbs');
const con = require('./db');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.get('/typegame', (req, res) => {
  res.render('typegame.hbs');
});

app.get('/create', (req, res) => {
  res.render('create.hbs');
});

app.post('/create', (req, res) => {
  var input = JSON.parse(JSON.stringify(req.body));
  var article = input.article;
  var sql = "INSERT INTO typegame (article) VALUES (" + con.escape(article) + ")";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/create");
  });
});

app.get('/api/article', (req, res) => {
  var sql = "SELECT article FROM typegame";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Starting Server");
});