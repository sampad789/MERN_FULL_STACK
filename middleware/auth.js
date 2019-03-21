const config = require("config");
const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for JWT token

  if (!token)
    return res.status(401).json({ msg: "Unauthorized Token , Access Denied" });

  try {
    //Verify token if there is a token
    // jwt.verify method
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid Token for access" });
  }
}
module.exports = auth;
