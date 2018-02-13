module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) next();
        else res.redirect("/login");
    },
    noCache: function (req, res, next) {
        res.header("cache-control", "private,no-cache,no-store,must-revalidate");
        next();
    },
    attachAuthInfo: function (req, res, next) {
        res.locals.authenticated = true;
        next();
    }
};