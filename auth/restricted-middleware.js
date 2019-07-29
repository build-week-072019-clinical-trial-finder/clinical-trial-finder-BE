const jwt = require("jsonwebtoken"); // <<<<< bring in the library
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  // get the token from Authorization header
  const token = req.headers.authorization; //////<<<<<<<<<

  // verify the token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // invalid token
        res.status(401).json({ message: "you shall not pass!" });
      } else {
        //valid oken
        req.jwtToken = decodedToken; // makes the token available to the rest of the api. anything that runs after this middleware can use that value. we showed this example with the roles
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token provided" });
  }
};
