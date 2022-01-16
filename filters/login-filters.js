const expressJwt = require("express-jwt")
const config = require("../config.json")
const { secret } = config

function loginFilters() {
    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            { url: "/users/", method: "POST" },
            { url: "/users/login", method: "POST" }
        ]
    });
};

module.exports = loginFilters