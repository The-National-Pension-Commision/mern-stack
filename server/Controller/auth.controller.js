const db = require('../Model');
const config = require('../Config/auth.config');


const User = db.user;
const Role = db.role;

const Op = db.sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // This method creates the user in the db
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 9),
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "user was registered successfully!" });
                })
            })
        } else {
            // User Role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered succesfully" })
            })
        }
    }).catch(error => {
        res.status(500).send({ message: error.message });
    })
}




