var mongoose = require('mongoose');

module.exports = mongoose.model("User", {
    username: { type: String, required: true },
    password: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true }
}); 