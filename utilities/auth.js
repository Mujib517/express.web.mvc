const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const config = require('../config');
const UserCtrl = require('../controllers/user.ctrl');

module.exports = {
    configure: function (app) {
        app.use(session({ secret: config.password, resave: false, saveUninitialized: false }));
        app.use(passport.initialize());
        app.use(passport.session());


        passport.serializeUser(function (user, done) {
            done(null, user.username);
        });

        passport.deserializeUser(function (username, done) {
            //db 
            done(null, username);
        });

        passport.use("local-login", new LocalStrategy(function (username, password, done) {
            UserCtrl.validate(username, password, done);
        }));

    }
}