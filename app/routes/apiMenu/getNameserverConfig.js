const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Module
const getNameserverConfig = require("../../modul/function/getNameserver/getNameserverConfig");
router.post("/", async (req, res) => {
  const passwordSudo = req.body.passwordSudo;
  const getNameserver = await getNameserverConfig(passwordSudo);
  return response(200, getNameserver, "Get Nameserver", res);
});

module.exports = router;
