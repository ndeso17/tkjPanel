const cekExistVHostOnSystem = require("./cekExistDomainVHost");
const cekExistDomainInSystem = require("../cekExistDomainInSystem");
const fs = require("fs");
const createVHost = require("./createVHost");
const login = require("../login");
const analisaInput = (passwordSudo, domain) => {
  return new Promise(async (resolve, reject) => {
    let dataPengecekanDomainUntukVHost;
    //Analisa Data, apakah domain sudah ada didalam folder /etc/bin/tPanel
    const pengecekanDomain = await cekExistDomainInSystem(domain);
    const statusPencocokanDomainZone = pengecekanDomain.kecocokanDomain;
    const fileKecocokanDomain = pengecekanDomain.domainCocokDengan;
    //Analisa Data, apakah domain sudah ada didalam folder /etc/apache2/sites-available ?
    const pengecekanVHost = await cekExistVHostOnSystem(domain);
    const kecocokanVHostDomain = pengecekanVHost.kecocokanDomain;
    const vHostCocokDengan = pengecekanVHost.domainCocokDengan;
    const statusPengecekanVHost = pengecekanVHost.statusPengecekan;
    const fileVHostConf = pengecekanVHost.fileKonfigurasiDomain;

    await login(passwordSudo);

    let targetPemeriksaan;
    let containsDomain = false; // Inisialisasi di luar loop
    const domainArray = domain.split(".");
    const targetPengecekanDomain = domainArray[0];

    if (fileKecocokanDomain != null) {
      targetPemeriksaan = `/etc/bind/tPanel/${fileKecocokanDomain}`;
      const data = fs.readFileSync(targetPemeriksaan, "utf8");
      containsDomain = data.includes(targetPengecekanDomain);
    } else {
      const pesanEror = "File konfigurasi Domain tidak ditemukan!"
      reject(pesanEror)
    }
    //Eksekusi
    if (statusPencocokanDomainZone && containsDomain) {
      let hasilPengerjaanVHostDomain;
      if (kecocokanVHostDomain && vHostCocokDengan != null) {
        hasilPengerjaanVHostDomain = {
          dataVHost: pengecekanVHost,
          message: "VHost Sudah Dibuat",
        };
      } else {
        const buatVHost = await createVHost(domain);
        hasilPengerjaanVHostDomain = buatVHost;
        // hasilPengerjaanVHostDomain = {
        //   dataVHost: pengecekanVHost,
        //   message: "VHost Siap Dibuat",
        // };
      }
      dataPengecekanDomainUntukVHost = hasilPengerjaanVHostDomain;
    } else {
      dataPengecekanDomainUntukVHost = {
        dataPengecekan: containsDomain,
        message: "Eror Domain Tidak Terdaftar",
      };
    }
    resolve(dataPengecekanDomainUntukVHost);
  });
};
module.exports = analisaInput;
