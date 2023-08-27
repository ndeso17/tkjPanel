// const express = require("express");
// const router = express.Router();
// const response = require("../../modul/view/response");
// const https = require("https");

// router.get("/", (req, res) => {
//   const domain = req.query.domain;

//   // Lakukan pengecekan terhadap domain apakah domain memiliki SSL atau tidak
//   checkSSLStatus(domain, (error, result) => {
//     if (error) {
//       const resCallback = {
//         ssl: false,
//         pesan: "Domain tidak memiliki SSL",
//       };
//       response(200, resCallback, "Sukses Get 2", res);
//     } else {
//       const resCallback = {
//         ssl: true,
//         pesan: "Domain memiliki SSL",
//       };
//       response(200, resCallback, "Sukses Get 2", res);
//     }
//   });
// });

// function checkSSLStatus(domain, callback) {
//   const options = {
//     method: "HEAD",
//     host: domain,
//     port: 443,
//     path: "/",
//   };

//   const req = https.request(options, (res) => {
//     const hasSSL = res.connection.getPeerCertificate().subject.CN === domain;
//     callback(null, hasSSL);
//   });

//   req.on("error", (error) => {
//     callback(error);
//   });

//   req.end();
// }

// module.exports = router;
const express = require("express");
const router = express.Router();
const response = require("../../modul/view/response");
const https = require("https");

router.get("/", (req, res) => {
  const domain = req.query.domain;

  // Lakukan pengecekan terhadap domain apakah domain dapat diakses melalui HTTPS
  checkDomainAccess(domain, (error, result) => {
    if (error) {
      const resCallback = {
        ssl: false,
        pesan: "Domain tidak memiliki SSL!",
      };
      response(200, resCallback, "Sukses Get 2", res);
    } else {
      const resCallback = {
        ssl: true,
        pesan: "Domain memiliki SSL.",
      };
      response(200, resCallback, "Sukses Get 2", res);
    }
  });
});

function checkDomainAccess(domain, callback) {
  const options = {
    method: "HEAD",
    host: domain,
    port: 443,
    path: "/",
  };

  const req = https.request(options, (res) => {
    callback(null, true); // Jika berhasil diakses, berarti domain bisa diakses melalui HTTPS
  });

  req.on("error", (error) => {
    callback(error, false); // Jika terjadi error, berarti domain tidak bisa diakses melalui HTTPS
  });

  req.end();
}

module.exports = router;
