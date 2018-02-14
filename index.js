
const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const config = require('./config');
const auth = require('./utilities/auth');

auth.configure(app);

// app.engine('hbs', hbs.express4({
//     defaultLayout: __dirname + "/views/index.hbs",
//     partialsDir: __dirname + '/views/partials'
// }));

//app.set('view engine', 'hbs');
app.set('view engine', 'jade');
app.set('views', __dirname + "/public/views/");

app.use(express.static(__dirname + "/lib"));

app.listen(port, function () {
    console.log("Server is running on " + port);
});

const isAuthenticated = require('./utilities/middlewares').isAuthenticated;
const noCache = require('./utilities/middlewares').noCache;
const attachAuthInfo = require('./utilities/middlewares').attachAuthInfo;



app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(config.conStr);

app.use('/', defaultRouter);
app.use('/', userRouter);

//app.use(isAuthenticated);
app.use(noCache);
app.use(attachAuthInfo);
app.use('/products', productRouter);