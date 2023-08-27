const fs = require("fs");
const { exec } = require("child_process");
const loginSystem = require("../../function/login");
const deleteDomain = (passwordSudo, domain, name, ttl, type, record) => {
  return new Promise(async (resolve, reject) => {
    const vHostConfig = `/etc/apache2/sites-available/${name}.${domain}.conf`;
    const login = await loginSystem(passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      reject(login);
    } else {
      const targetPemeriksaan = `/etc/bind/tPanel/db.${domain}`;

      try {
        const data = fs.readFileSync(targetPemeriksaan, "utf8");
        const lines = data.split("\n");

        let foundNegativeCache = false;
        let negativeCacheLines = [];
        const dataChecking = `${name}\t${ttl}\tIN\t${type}\t${record}`;

        for (const line of lines) {
          if (line.includes(dataChecking)) {
            foundNegativeCache = true;
          }
          if (foundNegativeCache) {
            negativeCacheLines.push(line);
          }
        }

        if (foundNegativeCache) {
          const command = `sudo sed -i '/${dataChecking}/d' ${targetPemeriksaan} && sudo rm ${vHostConfig} && sudo systemctl reload bind9 && sudo systemctl restart bind9 && sudo systemctl reload apache2 && sudo systemctl restart apache2`;
          exec(command, (error, stdout, stderr) => {
            if (error) {
              const statusPengerjaanCopyZonaDomain = {
                status: false,
                pesan: `Record Zone untuk Domain ${domain} gagal diperbarui, Error : ${error}`,
              };
              resolve(statusPengerjaanCopyZonaDomain);
            } else {
              const statusPengerjaanCopyZonaDomain = {
                status: true,
                pesan: `Record Zone untuk Domain ${domain} berhasil diperbarui`,
              };
              resolve(statusPengerjaanCopyZonaDomain);
            }
          });
        } else {
          resolve({ status: false, pesan: `Line tidak ditemukan` });
        }
      } catch (error) {
        // reject(error);
        const dataError = {
          status: false,
          pesan: error,
        };
        resolve(dataError);
      }
    }
  });
};

module.exports = deleteDomain;
