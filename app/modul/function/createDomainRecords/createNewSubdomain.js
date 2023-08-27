const path = require("path");
const fs = require("fs");
const eksekusiNewSubdomain = require("./eksekusiNewSubdomain");
const createNewSubdomain = (
  domain,
  ns1,
  ipAddress,
  akhirIpAddress,
  fileCocok
) => {
  const templateVHost = path.join(
    __dirname,
    `../../../../support/apache2/apache.conf`
  );
  const newVHost = path.join(
    __dirname,
    `../../../../support/apache2/${domain}.conf`
  );
  const tempaleIndex = path.join(
    __dirname,
    `../../../../support/index/index.html`
  );
  return new Promise(async (resolve, reject) => {
    const domainArray = domain.split(".");
    const awalDomain = domainArray[0];
    const fileZone = `/etc/bind/tPanel/${fileCocok}`;
    const filePTR = `/etc/bind/tPanel/db.${ipAddress}`;
    const domains = domain.split(",");
    const subDomain = domain;
    let iniDomain;

    const domainPartsMap = {
      1: 2,
      2: 3,
    };

    iniDomain = domains.map((domain) => {
      const parts = domain.split(".");
      const ekstensi = parts[parts.length - 1];
      const panjangEkstensi = ekstensi.length;

      const domainPartsToTake = domainPartsMap[panjangEkstensi] || 2;
      const iniHarusnyaDomain = parts.slice(-domainPartsToTake).join(".");

      return iniHarusnyaDomain;
    });

    const targetNewVHost = `/etc/apache2/sites-available/`;
    const rootDirectory = `/home/tkjPanel/${iniDomain[0]}/public_html/${subDomain}`;

    const dataCallBackSubDomain = {
      fileZone,
      filePTR,
      iniDomain,
      subDomain,
      targetNewVHost,
      rootDirectory,
      newVHost,
    };
    // resolve(dataCallBackSubDomain);
    const command = `
    echo "${awalDomain}\t14400\tIN\tA\t${ipAddress}" | sudo tee -a ${fileZone}\n
    echo "${akhirIpAddress}\t14400\tIN\tPTR\t${subDomain}" | sudo tee -a ${filePTR}\n
    sudo systemctl restart bind9\n
    sudo mkdir ${rootDirectory}\n
    sudo cp ${templateVHost} ${newVHost}\n
    sudo sed -i "s|folderRoot|${rootDirectory}|g" "${newVHost}"\n
    sudo sed -i "s|(domain)|${subDomain}|g" "${newVHost}"\n
    sudo chown -R www-data:www-data ${rootDirectory}\n
    sudo chmod -R 755 ${rootDirectory}\n
    sudo chmod 644 ${rootDirectory}/*\n
    sudo mv ${newVHost} ${targetNewVHost}\n
    sudo cp ${tempaleIndex} ${rootDirectory}/\n
    sudo a2ensite ${subDomain}.conf\n
    sudo systemctl reload apache2\n
    sudo systemctl restart apache2\n
    `;

    let statusKecocokan = false;
    const data = fs.readFileSync(fileZone, "utf8");
    statusKecocokan = data.includes(awalDomain);
    if (!statusKecocokan) {
      const eksekusi = await eksekusiNewSubdomain(command, subDomain);
      resolve(eksekusi);
    } else {
      resolve({
        pesan: `Anda tidak dapat membuat  subdomain yang sama berulang kali!`,
        subDomain,
      });
    }
  });
};

module.exports = createNewSubdomain;
