const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);
//Modul
const deleteFiFo = require("../../modul/function/fileManager/deleteFiFo.js");
router.post("/", async (req, res) => {
  const { passwordSudo, targetFiFo } = req.body;
  const dataInput = {
    passwordSudo,
    targetFiFo,
  };
  const edit = await deleteFiFo(dataInput);
  return response(200, edit, "Edit file", res);
});

module.exports = router;
