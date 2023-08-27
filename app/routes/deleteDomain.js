const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const middlewareAPi = require("./loginAPi");
const deleteDomain = require("../modul/function/getDomain/deleteDomain");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo, domain, name, ttl, type, record } = req.body;
  const dataDeleteDomain = await deleteDomain(
    passwordSudo,
    domain,
    name,
    ttl,
    type,
    record
  );
  return response(200, dataDeleteDomain, "Index APi", res);
});

module.exports = router;
