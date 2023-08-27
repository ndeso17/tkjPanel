const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const middlewareAPi = require("../loginAPi");
const getAllDomainConf = require("../../modul/function/getDomain/getAllDomainConf");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo } = req.body;
  //   const dataInput = {
  //     passwordSudo,
  //   };
  const dataGetDomain = await getAllDomainConf(passwordSudo);
  return response(200, dataGetDomain, "Index APi", res);
});

module.exports = router;
