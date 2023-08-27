const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const middlewareAPi = require("./loginAPi");
const getDomain = require("../modul/function/getDomain/getDomain")

// router.use(middlewareAPi);

router.post("/", middlewareAPi, async (req, res) => {
  const { passwordSudo, domain } = req.body;
  // const dataInput = {
  //   passwordSudo,
  //   domain,
  // }
  const dataGetDomain = await getDomain(domain);
  return response(200, dataGetDomain, "Index APi", res);
});

module.exports = router;
