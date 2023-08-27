const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const deleteFtpClient = require("../../modul/function/ftpClient/deleteFtpClient.js");
router.post("/", async (req, res) => {
  const dataFtpClient = {
    passwordSudo: req.body.passwordSudo,
    hostFtp: req.body.hostFtp,
    usernameFtp: req.body.usernameFtp,
    cluePwFtp: req.body.cluePwFtp,
    directoryFtp: req.body.directoryFtp,
  };
  const hapusFtpClient = await deleteFtpClient(dataFtpClient);
  return response(200, hapusFtpClient, "Delete Ftp Client", res);
});

module.exports = router;
