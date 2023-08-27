const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Modul
const createNewDatabase = require("../../modul/function/mysql/createNewDatabase.js");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", async (req, res) => {
  const { passwordSudo, ownerName, databaseName } = req.body;
  const buatUserMysql = await createNewDatabase(
    passwordSudo,
    ownerName,
    databaseName
  );
  return response(200, buatUserMysql, "tPanel siap digunakan", res);
});

module.exports = router;
