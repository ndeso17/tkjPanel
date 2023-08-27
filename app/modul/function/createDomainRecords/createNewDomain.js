const path = require("path");
const eksekusiCommand = require("./eksekusiCommandCreateNewDomainWPTR");
const createNewDomain = (
  domain,
  ns1,
  ns2,
  ipAddress,
  ipAddrArpa,
  akhirIpAddress
) => {
  const templateZoneDomainPath = path.join(
    __dirname,
    `../../../../support/bind9/db.domain`
  );
  const newZoneDomainPath = path.join(
    __dirname,
    `../../../../support/bind9/db.${domain}`
  );
  const templateNamedConf = path.join(
    __dirname,
    `../../../../support/bind9/named.conf`
  );
  const newNamedConf = path.join(
    __dirname,
    `../../../../support/bind9/${domain}.conf`
  );

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
  const targetNamedConf = `/etc/bind/named.conf`;
  const targetMoveRecordZone = "/etc/bind/tPanel/";
  const targetPushPTR = `/etc/bind/tPanel/db.${ipAddress}`;
  const targetNewVHost = `/etc/apache2/sites-available/`;
  const nilaiTanpaNs1 = ns1.replace("ns1.", "");
  const rootDirectory = `/home/tkjPanel/${domain}/public_html`;
  const record = {
    ns1Record: `@\t14400\tIN\tNS\t${ns1}.`,
    ns2Record: `@\t14400\tIN\tNS\t${ns2}.`,
    ns1IpRecord: `ns1\t14400\tIN\tA\t${ipAddress}`,
    ns2IpRecord: `ns2\t14400\tIN\tA\t${ipAddress}`,
    rootIpRecord: `@\t14400\tIN\tA\t${ipAddress}`,
    cnameRecord: `www\t14400\tIN\tCNAME\t@`,
    mailDomainRecord: `mail\t14400\tIN\tA\t${ipAddress}`,
    mailMxRecord: `@\t14400\tIN\tMX\t10 mail.${domain}.`,
    spf1Record: `@\t14400\tIN\tTXT\t"v=spf1 ip4:${ipAddress} -all".`,
    ptrDomainRecord: `${akhirIpAddress}\t14400\tIN\tPTR\t${domain}.`,
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const version = "01";

  const noSerialDomain = `${year}${month}${day}${version}`;
  return new Promise(async (resolve, reject) => {
    const command = `
    sudo cp ${templateZoneDomainPath} ${newZoneDomainPath}\n
    sudo sed -i "s|(domain)|${domain}|g" "${newZoneDomainPath}"\n
    sudo sed -i "s|(noSerialDomain)|${noSerialDomain}|g" "${newZoneDomainPath}"\n
    echo '${record.ns1Record}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.ns2Record}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.ns1IpRecord}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.ns2IpRecord}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.rootIpRecord}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.cnameRecord}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.mailDomainRecord}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.mailMxRecord}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.spf1Record}' | sudo tee -a ${newZoneDomainPath}\n
    echo '${record.ptrDomainRecord}' | sudo tee -a ${targetPushPTR}\n
    sudo mv ${newZoneDomainPath} ${targetMoveRecordZone}\n 
    echo 'zone "${domain}" { type master; file "/etc/bind/tPanel/db.${domain}"; };' | sudo tee -a ${targetNamedConf}\n 
    sudo systemctl restart bind9\n 
    sudo mkdir /home/tkjPanel/${domain}\n 
    sudo mkdir ${rootDirectory}\n 
    sudo cp ${templateVHost} ${newVHost}\n 
    sudo sed -i "s|folderRoot|${rootDirectory}|g" "${newVHost}"\n
    sudo sed -i "s|(domain)|${domain}|g" "${newVHost}"\n
    sudo mv ${newVHost} ${targetNewVHost}\n 
    sudo chown -R www-data:www-data /home/${domain}/public_html\n
    sudo chmod -R 755 /home/${domain}/public_html\n 
    sudo chmod 644 /home/${domain}/public_html/*\n
    sudo cp ${tempaleIndex} /home/tkjPanel/${domain}/public_html\n 
    sudo a2ensite ${domain}.conf\n 
    sudo systemctl reload apache2\n 
    sudo systemctl restart apache2\n`;
    const eksekusi = await eksekusiCommand(command, domain);

    resolve(eksekusi);
  });
};
module.exports = createNewDomain;
