const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
//Middleware
const middlewareAPi = require("./loginAPi");
router.use(middlewareAPi);

router.get("/", (req, res) => {
  return response(200, null, "Ini Index APi", res);
});

module.exports = router;
