const express = require("express");
const router = express.Router();
const response = require("../modul/view/response");
const middlewareAPi = require("./loginAPi");
const getIpAddressFromNS = require("../modul/function/getIpAddressFromNS");

// router.use(middlewareAPi);

router.get("/", middlewareAPi, async (req, res) => {
  //   return response(200, null, "Index APi", res);
  const ns1 = "serverlokal.lap";
  let ipAddressDomain;
  let statusIP;
  const analisaIPFromNS = await getIpAddressFromNS(ns1);
  ipAddressDomain = analisaIPFromNS.ipAddressDomain;

  // Format IP Address yang diharapkan (contoh: 192.168.1.1)
  const expectedIpAddressFormat = /^(\d{1,3}\.){3}\d{1,3}$/;

  if (!expectedIpAddressFormat.test(ipAddressDomain)) {
    statusIP = false;
  } else {
    statusIP = true;
  }
  response(201, statusIP, "Ini Status IP", res);
});

module.exports = router;
