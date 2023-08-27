const fs = require("fs");
const path = require("path");
const installWordpress = (dataDomain, dataSetup) => {
  const domain = dataSetup.domain;
  const bahasa = dataSetup.bahasa;
  const usernameWp = dataSetup.usernameWp;
  const passwordWp = dataSetup.passwordWp;
  const emailAdminWp = dataSetup.emailAdminWp;
  const namaSitus = dataSetup.namaSitus;
  const dbNama = dataSetup.dbNama;
  const dbUser = dataSetup.dbUser;
  const dbPassword = dataSetup.dbPassword;
  const passwordSudo = dataSetup.passwordSudo;

  let iniBahasa;
  iniBahasa =
    bahasa === "indonesia" ? "id_ID" : bahasa === "inggris" ? "en_US" : "id_ID";
  const urlDomain = `https://${domain}`;

  const setupWp = require("./setupWp");
  const templateSetup = path.join(
    __dirname,
    `../../../../support/installApp/wpsetup/setup.sh`
  );
  const wpSetup = path.join(
    __dirname,
    `../../../../support/installApp/wpsetup/${domain}.setup.sh`
  );
  const templateApacheConf = path.join(
    __dirname,
    `../../../../support/apache2/apache.conf`
  );
  const newApacheConf = path.join(
    __dirname,
    `../../../../support/apache2/${domain}.conf`
  );
  const apacheConf = `/etc/apache2/sites-available/`;
  const originalApacheConf = `/etc/apache2/sites-available/${domain}.conf`;
  return new Promise(async (resolve, reject) => {
    if (!dataDomain.kecocokanDomain) {
      const dataInput = {
        dataDomain: dataDomain.kecocokanDomain,
        fileConfDomain: dataDomain.domainCocokDengan,
        status: false,
        pesan: "Eror!",
      };
      resolve(dataInput);
    } else {
      let targetPemeriksaan;
      let containsDomain = false;
      const arrayFileKonfigurasiDomain = dataDomain.fileKonfigurasiDomain;
      const fileCocok = dataDomain.domainCocokDengan;

      if (fileCocok != null) {
        targetPemeriksaan = `/etc/bind/tPanel/${fileCocok}`;
        const data = fs.readFileSync(targetPemeriksaan, "utf8");
        containsDomain = data.includes(domain);
      } else {
        for (const fileKonfigurasi of arrayFileKonfigurasiDomain) {
          targetPemeriksaan = `/etc/bind/tPanel/${fileKonfigurasi}`;

          try {
            const data = fs.readFileSync(targetPemeriksaan, "utf8");
            containsDomain = data.includes(domain);
            if (containsDomain) {
              break;
            }
          } catch (err) {
            console.error("Terjadi kesalahan saat membaca file:", err);
          }
        }
      }

      if (containsDomain) {
        const rootDirectory = `/home/${domain}/public_html`;
        const command = `sudo cp ${templateSetup} ${wpSetup} && sudo sed -i "s|rootDirectory|${rootDirectory}|g" "${wpSetup}" && sudo sed -i "s|bahasa|${iniBahasa}|g" "${wpSetup}" && sudo sed -i "s|nama_database|${dbNama}|g" "${wpSetup}" && sudo sed -i "s|nama_pengguna|${dbUser}|g" "${wpSetup}" && sudo sed -i "s|kata_sandi|${dbPassword}|g" "${wpSetup}" && sudo sed -i "s|urlDomain|${urlDomain}|g" "${wpSetup}" && sudo sed -i "s|namaSitus|${namaSitus}|g" "${wpSetup}" && sudo sed -i "s|usernameWp|${usernameWp}|g" "${wpSetup}" && sudo sed -i "s|passwordWp|${passwordWp}|g" "${wpSetup}" && sudo sed -i "s|emailAdminWp|${emailAdminWp}|g" "${wpSetup}" && sudo cp ${templateApacheConf} ${newApacheConf} && sudo sed -i "s|folderRoot|${rootDirectory}|g" "${newApacheConf}" && sudo rm ${originalApacheConf} && sudo mv ${newApacheConf} ${apacheConf} && sudo bash ${wpSetup} && sudo systemctl reload apache2 && sudo systemctl restart apache2\n`;
        // const command = `sudo cp ${templateSetup} ${wpSetup} && sudo sed -i "s|rootDirectory|${rootDirectory}|g" "${wpSetup}" && sudo sed -i "s|bahasa|${iniBahasa}|g" "${wpSetup}" && sudo sed -i "s|nama_database|${dbNama}|g" "${wpSetup}" && sudo sed -i "s|nama_pengguna|${dbUser}|g" "${wpSetup}" && sudo sed -i "s|kata_sandi|${dbPassword}|g" "${wpSetup}" && sudo sed -i "s|urlDomain|${urlDomain}|g" "${wpSetup}" && sudo sed -i "s|namaSitus|${namaSitus}|g" "${wpSetup}" && sudo sed -i "s|usernameWp|${usernameWp}|g" "${wpSetup}" && sudo sed -i "s|passwordWp|${passwordWp}|g" "${wpSetup}" && sudo sed -i "s|emailAdminWp|${emailAdminWp}|g" "${wpSetup}" && sudo cp ${templateApacheConf} ${newApacheConf} && sudo sed -i "s|folderRoot|${rootDirectory}|g" "${newApacheConf}"\n`;
        const prosesSetup = await setupWp(passwordSudo, command, domain);
        resolve(prosesSetup);
      } else {
        const arrayDomain = domain.split(".");
        const subdomain = arrayDomain[0];
        // const subdomain
        const data = fs.readFileSync(targetPemeriksaan, "utf8");
        const mengandungSubdomain = data.includes(subdomain);
        if (!mengandungSubdomain) {
          const dataOke = {
            targetPemeriksaan,
            containsDomain,
            status: false,
            pesan: "Eror!",
          };
          resolve(dataOke);
        } else {
          const dataOke = {
            targetPemeriksaan,
            containsDomain,
            subdomain,
            pesan: "oke",
          };
          resolve(dataOke);
        }
      }
    }
  });
};
module.exports = installWordpress;
