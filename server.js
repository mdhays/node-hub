'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');
const pg = require('pg').native;
const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://localhost:5432/nodehub';
let db = new pg.Client(POSTGRES_URL);

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
