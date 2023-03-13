const jwt = require("jsonwebtoken");
const wrapper = require("../utils/wrapper");

module.exports = {
  authentication: (req, res, next) => {
    // console.log(req.headers);
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return wrapper.response(
        res,
        403,
        "Please Login first to access this page!",
        []
      );
    }

    const token = bearerToken.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err && err.name) {
        return wrapper.response(res, 403, err.message, null);
      }

      if (err) {
        return wrapper.response(res, 500, "Internal Server Error", null);
      }

      req.authInfo = payload;
      next();
    });
  },
  adminAuthorization: (req, res, next) => {
    const { role } = req.authInfo;

    if (role.toLowerCase() !== "admin") {
      return wrapper.response(
        res,
        403,
        "Oops, you have no access to this page!",
        []
      );
    }

    next();
  },
  isAuthorized: (req, res, next) => {
    const { id: loggedId } = req.authInfo;
    const { id: userPageId } = req.params;
    console.table({ loggedId, userPageId });

    if (loggedId !== +userPageId) {
      return wrapper.response(
        res,
        403,
        "You have no access to edit this user profile!",
        []
      );
    }

    next();
  },
};
