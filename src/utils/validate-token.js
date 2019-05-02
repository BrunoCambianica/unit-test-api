let jwt = require("jsonwebtoken");
let conf = require("../config/config-mongo");

exports.token = (req, resp, next) => {
  if (req.headers["authorization"]) {
    let token =
      req.headers["authorization"].split(" ")[1] ||
      req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, conf.key, (err, decoded) => {
        if (err) {
          resp.status(403).json({ status: "error", message: err.message });
        } else {
          console.log(`mail: ${decoded.login}`);
          req.set("user", decoded);
          next();
        }
      });
    } else
      resp.status(401).json({ status: "error", message: "token required" });
  } else resp.status(401).json({ status: "error", message: "token required" });
};
