const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
// Middleware
const middlewareAPi = require("../loginAPi");
// Modul
const createFtpClient = require("../../modul/function/ftpClient/createFtpClient");
const checkingDomain = require("../../modul/function/cekExistDomainInSystem");
const identifikasiDomain = require("../../modul/function/installApp/identifikasiDomain");

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo, domain, usernameFtp, passwordFtp, cluepwFtp } =
    req.body;
  // const dataInput = {
  //   passwordSudo,
  //   domain,
  //   usernameFtp,
  //   passwordFtp,
  //   cluepwFtp,
  // };
  // response(201, dataInput, "Create FTP Clientt", res);
  const domainIdentifier = await identifikasiDomain(domain);
  const statusDomain = domainIdentifier.statusDomain;
  if (!statusDomain) {
    const statusIdentifikasi = {
      status: false,
      data: domainIdentifier,
    };
    response(
      201,
      statusIdentifikasi,
      "Create Ftp User Gagal, Domain inValid",
      res
    );
  } else {
    const cekDomain = await checkingDomain(domain);
    let username;
    function checkUsernameFormat(usernameFtp) {
      const firstChar = usernameFtp.charAt(0);
      return firstChar === firstChar.toUpperCase();
    }

    const isUsernameValid = checkUsernameFormat(usernameFtp);
    if (!isUsernameValid) {
      const resCallBack = {
        status: false,
        pesan: `Username harus diawali dengan huruf kapital dan tanpa spasi, ganti spasi dengan underline (_)`,
      };
      response(201, resCallBack, "Invalid Username", res);
    } else {
      username = `ftp_${usernameFtp}`;
      const dataSetup = {
        passwordSudo,
        domain,
        username,
        passwordFtp,
        cluepwFtp,
      };
      const setupFtpClient = await createFtpClient(cekDomain, dataSetup);
      response(200, setupFtpClient, "Create Ftp User", res);
    }
  }
});

module.exports = router;
