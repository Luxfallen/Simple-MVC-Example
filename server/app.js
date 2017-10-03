// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/simpleMVCExample';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

app.use(favicon(`${__dirname}/../client/img/favicon.png`));

app.use(cookieParser());

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

