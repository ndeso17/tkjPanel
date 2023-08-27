const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const middlewareAPi = require("../loginAPi");
const getAllNameserver = require("../../modul/function/getDomain/getAllNameserver");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo } = req.body;
  const dataGetNameserver = await getAllNameserver(passwordSudo);
  return response(200, dataGetNameserver, "Index APi", res);
});

module.exports = router;
