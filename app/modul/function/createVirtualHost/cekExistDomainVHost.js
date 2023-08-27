const fs = require("fs");

const cekExistDomainInSystem = (domain) => {
  return new Promise((resolve, reject) => {
    const folderPath = "/etc/apache2/sites-available";
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        const dataPengecekanDomain = {
          messagePengecekan: "Terjadi kesalahan saat membaca folder",
          dataPengecekan: null,
          statusPengecekan: 500,
        };
        resolve(dataPengecekanDomain);
      } else {
        if (files.length === 0) {
          const dataPengecekanDomain = {
            messagePengecekan: "Folder /etc/bind/tPanel kosong",
            dataPengecekan: [],
            statusPengecekan: 404,
          };
          resolve(dataPengecekanDomain);
        } else {
          let domainCocok = false;
          let domainCocokDengan = null;

          const isDomainInFiles = files.some((file) => file.startsWith(domain));
          const fileCocok = files.filter((file) => file.startsWith(domain));
          if (isDomainInFiles) {
            domainCocok = true;
            // domainCocokDengan = fileCocok;
            domainCocokDengan = fileCocok.join(", ");
          } else {
            domainCocok = false;
          }

          const dataPengecekanDomain = {
            messagePengecekan:
              "File konfigurasi Virtual Host Domain ditemukan di dalam folder /etc/apache2/sites-available",
            dataPengecekan: files,
            statusPengecekan: domainCocok ? 200 : 404,
          };

          const hasilPengecekanDomain = {
            kecocokanDomain: domainCocok,
            domainCocokDengan: domainCocokDengan,
            messagePengecekan: dataPengecekanDomain.messagePengecekan,
            statusPengecekan: dataPengecekanDomain.statusPengecekan,
            fileKonfigurasiDomain: dataPengecekanDomain.dataPengecekan,
          };

          resolve(hasilPengecekanDomain);
        }
      }
    });
  });
};

module.exports = cekExistDomainInSystem;
