const fs = require("fs");
const loginSystem = require("../../function/login");
const { exec } = require("child_process");

const deleteAllDataDomain = (passwordSudo, domain) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    const namedConf = `/etc/bind/named.conf`;
    const fileRecord = `/etc/bind/tPanel/db.${domain}`;
    const rootDirectory = `/home/tkjPanel/${domain}`;
    const vHostDirectory = "/etc/apache2/sites-available";
    const vHostFiles = fs.readdirSync(vHostDirectory);
    const vHostConfFiles = vHostFiles.filter((fileName) =>
      fileName.endsWith(`${domain}.conf`)
    );

    const command = `sudo  sed -i '/${domain}/d' ${namedConf} && sudo rm ${fileRecord} && sudo rm -rf ${rootDirectory} && sudo rm ${vHostConfFiles
      .map((file) => `${vHostDirectory}/${file}`)
      .join(
        " "
      )} && sudo systemctl reload bind9 && sudo systemctl restart bind9`;

    // const command = `sudo sed -i '/zone "${domain}" { type master; file "\/etc\/bind\/tPanel\/db.${domain}"; };/d' /etc/bind/named.conf`;
    // const perintah = `sudo sed -i '/domain.lap/d' /etc/bind/named.conf`;
    //   zone "domain.lap" { type master; file "/etc/bind/tPanel/db.domain.lap"; };
    // resolve(proses);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const statusProses = {
          status: false,
          pesan: `Record Zone untuk Domain ${domain} gagal dihapus, Error : ${error}`,
        };
        console.error(error);
        resolve(statusProses);
      } else {
        const statusProses = {
          status: true,
          pesan: `Record Zone untuk Domain ${domain} berhasil dihapus`,
        };
        console.log(stdout);
        resolve(statusProses);
      }
    });
  });
};

module.exports = deleteAllDataDomain;
