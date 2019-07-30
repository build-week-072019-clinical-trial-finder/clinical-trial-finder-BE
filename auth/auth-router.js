const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");
const secrets = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;

  if (user.username.length > 0 && user.password.length > 5) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      message:
        "Username can't be blank and Password must be 6 or more characters"
    });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  // payload is the data of the token
  const jwtPayload = {
    subject: user.id,
    username: user.username

    /// we can put any data from the database here
  };

  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;
