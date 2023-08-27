const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const loginSystem = require("../login");
const deleteDomain = (passwordSudo, domain, subDomain, ttl, tipe, record) => {
  const templateVHost = path.join(
    __dirname,
    `../../../../support/apache2/apache.conf`
  );
  const newVHost = path.join(
    __dirname,
    `../../../../support/apache2/${subDomain}.${domain}.conf`
  );
  const tempaleIndex = path.join(
    __dirname,
    `../../../../support/index/index.html`
  );
  const rootDirectory = `/home/${domain}/public_html/${subDomain}.${domain}`;
  return new Promise(async (resolve, reject) => {
    // const dataInput = {
    //   passwordSudo,
    //   domain,
    //   subDomain,
    //   ttl,
    //   type,
    //   record,
    // };
    // resolve(dataInput);
    const login = await loginSystem(passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      reject(login);
    } else {
      const targetPemeriksaan = `/etc/bind/tPanel/db.${domain}`;
      // const dataAddRecordDomain = {
      //   tempaleIndex,
      //   templateVHost,
      //   newVHost,
      //   rootDirectory,
      //   targetPemeriksaan,
      // };
      // resolve(dataAddRecordDomain);
      try {
        const data = fs.readFileSync(targetPemeriksaan, "utf8");
        const lines = data.split("\n");

        let foundNegativeCache = false;
        let negativeCacheLines = [];
        const dataChecking = `${subDomain}\t${ttl}\tIN\t${tipe}\t${record}`;

        for (const line of lines) {
          if (line.includes(dataChecking)) {
            foundNegativeCache = true;
          }
          if (foundNegativeCache) {
            negativeCacheLines.push(line);
          }
        }

        if (foundNegativeCache) {
          resolve({
            statusLine: `Record sudah ada! Kamu tidak dapat menambahakan doubel Record yang sama.`,
          });
        } else {
          const command = `
          sudo sh -c 'echo "${dataChecking}" >> ${targetPemeriksaan}'\n
          sudo systemctl reload bind9\n
          sudo systemctl restart bind9\n
          sudo cp ${templateVHost} ${newVHost}\n
          sudo sed -i "s|folderRoot|${rootDirectory}|g" "${newVHost}"\n
          sudo sed -i "s|(domain)|${subDomain}|g" "${newVHost}"\n
          sudo mv ${newVHost} /etc/apache2/sites-available/\n
          sudo mkdir ${rootDirectory}\n
          sudo chown -R www-data:www-data ${rootDirectory}\n
          sudo chmod -R 755 ${rootDirectory}\n
          sudo chmod 644 ${rootDirectory}/*\n
          sudo cp ${tempaleIndex} ${rootDirectory}/\n `;
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
        }
      } catch (error) {
        reject(error);
      }
    }
  });
};

module.exports = deleteDomain;
