'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');
const pg = require('pg').native;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/nodehub';
let db = new pg.Client(DATABASE_URL);

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static('public'));

pg.defaults.ssl = true;


app.get('/', (req, res) => {
  res.render('index');
});

db.connect((err) => {
  if (err) throw err;

    pg.connect(DATABASE_URL, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');
      db = client;
      db.query('SELECT * FROM tracking', (err, result) => {
        if (err) throw err;
        console.log(result.rows);
      });
    });
});


app.get('/home', (req, res) => {
  db.query('SELECT * FROM tracking', (err, result) => {
    if (err) throw err;

    res.send(result.rows);
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
