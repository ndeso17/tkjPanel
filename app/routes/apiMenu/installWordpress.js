const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Definisi Modul
const installWordpress = require("../../modul/function/installApp/installWordpress");
const checkingDomain = require("../../modul/function/cekExistDomainInSystem");
const identifikasiDomain = require("../../modul/function/installApp/identifikasiDomain");

router.post("/", async (req, res) => {
  const {
    passwordSudo,
    domain,
    usernameWp,
    passwordWp,
    emailAdminWp,
    namaSitus,
    dbNama,
    dbUser,
    dbPassword,
    bahasa,
  } = req.body;
  const domainIdentifier = await identifikasiDomain(domain);
  const statusDomain = domainIdentifier.statusDomain;
  if (!statusDomain) {
    const statusIdentifikasi = {
      status: false,
      data: domainIdentifier,
    };
    response(201, statusIdentifikasi, "Install Wp Gagal, Domain inValid", res);
  } else {
    const cekDomain = await checkingDomain(domain);
    const dataSetup = {
      passwordSudo,
      domain,
      usernameWp,
      passwordWp,
      emailAdminWp,
      namaSitus,
      dbNama,
      dbUser,
      dbPassword,
      bahasa,
    };
    const setupWp = await installWordpress(cekDomain, dataSetup);
    response(200, setupWp, "Install Wp", res);
  }
});

module.exports = router;
