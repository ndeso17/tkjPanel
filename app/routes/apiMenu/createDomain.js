const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
//Definisi Function
const domainIdentifier = require("../../modul/function/domainIdentifier");
const ipAddressIdentifier = require("../../modul/function/ipAddressIdentifier");
const cekExistDomainInSystem = require("../../modul/function/cekExistDomainInSystem");
const loginSystem = require("../../modul/function/login");
const newDomain = require("../../modul/function/createDomainRecords/analisaInputDomain");
const getIpAddressFromNS = require("../../modul/function/getIpAddressFromNS");
//Middleware
const middlewareAPi = require("../loginAPi");
router.use(middlewareAPi);

router.post("/", async (req, res) => {
  const { passwordSudo, domain, ns1, ns2 } = req.body;
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

  if (!statusIP) {
    response(
      201,
      {
        status: statusIP,
        pesan: "Nameserver Invalid, kami tidak dapat mengenali nameserver",
      },
      "Data Input UI",
      res
    );
  } else {
    const dataInputBody = {
      passwordSudo,
      domain,
      ns1,
      ns2,
      ipAddressDomain,
    };
    // response(201, dataInputBody, "Data input Body!", res);
    if (dataInputBody != null) {
      const login = await loginSystem(passwordSudo, domain);
      const identifikasiIP = await ipAddressIdentifier(ipAddressDomain);
      const identifikasiDomain = await domainIdentifier(domain, ns1, ns2);
      const statusDomain = identifikasiDomain.statusDomain;
      const pengecekanDomain = await cekExistDomainInSystem(domain);

      if (statusDomain) {
        const createNewDomainRecords = await newDomain(
          identifikasiDomain,
          identifikasiIP,
          pengecekanDomain
        );
        response(
          200,
          createNewDomainRecords,
          "Identifikasi Berhasil, Domain Valid! proses pembuatan record domain / subdomain dilanjutkan.",
          res
        );
      } else {
        const dataPengidentifikasian = {
          hasilIdentifikasiDomain: identifikasiDomain,
          hasilIdentifikasiIPAddress: identifikasiIP,
        };
        response(
          500,
          dataPengidentifikasian,
          "Identifikasi Berhasil, Domain Tidak Valid.",
          res
        );
      }
    } else {
      const dataCallBack = {
        dataInputBody,
        status: false,
        pesan: "Data tidak boleh kosong!",
      };
      response(403, dataCallBack, dataCallBack.pesan, res);
    }
  }
});

module.exports = router;
