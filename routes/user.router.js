const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => res.render("pages/login"));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/login");
});

router.post("/login", passport.authenticate("local-login", {
    successRedirect: '/products',
    failureRedirect: '/login'
}));

module.exports = router;