const auth = require("../controllers/auth");
const express = require("express");
const router = express();

//authentication
router.post("/login", async (req, res, next) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  login = await auth(req);

  if ("auth" in login) return res.status(200).json(login);

  return res.status(400).json(login);
});

router.post("/logout", function (req, res) {
  res.json({ auth: false, token: null });
});

module.exports = router;
