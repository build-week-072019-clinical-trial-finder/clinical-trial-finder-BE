const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

// [
//   {
//     id: 1,
//     username: "george",
//     watchlist: [
//       {
//         title:
//           "Multiple Ascending Dose Study of HM12460A in Type 2 Diabetes Mellitus",
//         conditions: ["Type 2 Diabetes Mellitus"],
//         interventions: ["Biological: HM12460A"],
//         phase: "Phase 1",
//         numberEnrolled: 48,
//         locations: ["Chula Vista, California, United States"],
//         age: "18 Years to 70 Years",
//         sex: "All",
//         studyStart: "October 25, 2017",
//         url: "https://clinicaltrials.gov/ct2/show/NCT03332836"
//       }
//     ]
//   }
// ];
