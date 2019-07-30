const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const axios = require("axios");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
// const dataRouter = require("./clinical/data-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", authRouter);
server.use("/api", usersRouter);
// server.use("/api", dataRouter);

server.get("/", (req, res) => {
  res.send(
    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
  );
});

// const postData = async () => {
//   return await axios({
//     url:
//       "http://clinical-trial-dev.p5ykpijgyk.us-east-2.elasticbeanstalk.com/fetch_data",
//     method: "post"
//   });
// };

module.exports = server;
