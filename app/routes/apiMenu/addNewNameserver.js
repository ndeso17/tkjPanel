const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const addNewNameserver = require("../../modul/function/getNameserver/addNewNameserver.js");
router.post("/", async (req, res) => {
  const { passwordSudo, nameserver, ipaddress } = req.body;
  const newNameserver = await addNewNameserver(
    passwordSudo,
    nameserver,
    ipaddress
  );
  return response(200, newNameserver, "Add Nameserver", res);
});

module.exports = router;
