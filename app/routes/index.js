const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const middlewareAPi = require("./loginAPi");

// router.use(middlewareAPi);

router.get("/", middlewareAPi, (req, res) => {
  return response(200, null, "Index APi", res);
});

module.exports = router;
