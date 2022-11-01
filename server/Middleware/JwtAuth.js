// Import json webtoken
const jwt = require("jsonwebtoken");
const config = require("../Config/auth.config");

const db = require("../Model");

const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    // Return error if no token is provided
    if (!token) {
        return res.status(403).send({
            message: "No Token was provided!",
        });
    }

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// verify if user is admin or has admin privileges
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requires admin role",
            });
            return;
        });
    });
};

// verify if user is a mod

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requires moderator role",
            });
            return;
        });
    });
};

// For moderator or admin
isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!",
            });
        });
    });
};

const jwtAuth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
};

module.exports = jwtAuth;