const User = require("../models/user.model");
const bcrypt = require('bcrypt');

module.exports = {

    validate: (username, password, done) => {
        User.findOne({ username: username })
            .exec()
            .then(function (user) {
                if (!user) done("Wrong username or password");
                else {
                    var result = bcrypt.compareSync(password, user.password);
                    if (!result) done("Wrong username or password");
                    else done(null, user);
                }
            });
    }
};