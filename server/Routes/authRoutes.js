const { verifySignUp } = require("../Middleware");
const controller = require("../Controller/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "X-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkIfRolesExist,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
