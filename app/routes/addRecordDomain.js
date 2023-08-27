const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const middlewareAPi = require("./loginAPi");
const addRecordDomain = require("../modul/function/getDomain/addRecordDomain");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo, domain, subDomain, ttl, tipe, record } = req.body;
  const dataAddRecordDomain = await addRecordDomain(
    passwordSudo,
    domain,
    subDomain,
    ttl,
    tipe,
    record
  );
  return response(200, dataAddRecordDomain, "Index APi", res);
});

module.exports = router;
