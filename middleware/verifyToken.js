const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { resRedirect, resCode } = require('../functions/response');

function protected(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return resRedirect(res, 401, "/login");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return resRedirect(res, 401, "/logout")
        }
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Continue with the next middleware or route handler
    });
}

function protectedAPI(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return resCode(res, 401, "No token is provided!");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return resCode(res, 401, "Token can't be verifyed!")
        }

        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Continue with the next middleware or route handler
    });
}

module.exports = { protected, protectedAPI };