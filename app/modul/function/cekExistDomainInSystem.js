const fs = require("fs");

const cekExistDomainInSystem = (domain) => {
  return new Promise((resolve, reject) => {
    const folderPath = "/etc/bind/tPanel";
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
          let parts;
          let namaDomainFile;

          for (const domainFile of files) {
            parts = domainFile.split(".");
            namaDomainFile = parts.slice(1).join(".");

            if (
              namaDomainFile === domain ||
              domain.endsWith(`.${namaDomainFile}`)
            ) {
              domainCocok = true;
              domainCocokDengan = domainFile;
              break;
            }
          }

          const dataPengecekanDomain = {
            messagePengecekan:
              "File konfigurasi Domain ditemukan di dalam folder /etc/bind/tPanel",
            dataPengecekan: files,
            statusPengecekan: domainCocok ? 200 : 404,
          };

          const bagianPecahanDomain = {
            partsDomain: parts,
            namaDomainFile: namaDomainFile,
          };
          const hasilPengecekanDomain = {
            kecocokanDomain: domainCocok,
            domainCocokDengan: domainCocokDengan,
            messagePengecekan: dataPengecekanDomain.messagePengecekan,
            statusPengecekan: dataPengecekanDomain.statusPengecekan,
            fileKonfigurasiDomain: dataPengecekanDomain.dataPengecekan,
            domainPecahan: bagianPecahanDomain,
          };

          resolve(hasilPengecekanDomain);
        }
      }
    });
  });
};

module.exports = cekExistDomainInSystem;
