const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Modul
const createMysqlUser = require("../../modul/function/mysql/createMysqlUser");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", async (req, res) => {
  const { passwordSudo, host, username, password, ciriPassword } = req.body;
  const buatUserMysql = await createMysqlUser(
    passwordSudo,
    host,
    username,
    password,
    ciriPassword
  );
  return response(200, buatUserMysql, "tPanel siap digunakan", res);
});

module.exports = router;
