const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const config = require('./config');


app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + "/views/index.hbs",
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + "/lib"));

app.listen(port, function () {
    console.log("Server is running on " + port);
});

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.conStr);

app.use('/', defaultRouter);
app.use('/products', productRouter);