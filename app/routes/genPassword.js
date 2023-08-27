//Paket
const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const pwGenerator = require("../modul/function/pwGenerator");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const buatPw = await pwGenerator(password, username);
  if (buatPw) {
    response(
      200,
      { hasilGenPassword: buatPw },
      "Password Berhasil Dibuat",
      res
    );
  } else {
    response(400, null, "Password Gagal Dibuat", res);
  }
});
module.exports = router;
