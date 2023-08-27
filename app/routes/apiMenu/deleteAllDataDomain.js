const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const middlewareAPi = require("../loginAPi");
const deleteAllDataDomain = require("../../modul/function/getDomain/deleteAllDataDomain");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo, domain } = req.body;
  const deleteDomain = await deleteAllDataDomain(passwordSudo, domain);
  response(200, deleteDomain, "Sukses Get 2", res);
});

module.exports = router;
