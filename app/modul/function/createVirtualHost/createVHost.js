const path = require("path");
const eksekusiCommand = require("./eksekusiCommand");
const createVHost = (domain) => {
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
  const newFolder = `/home/${domain}/public_html`;
  const targetNewVHost = `/etc/apache2/sites-available/`;
  return new Promise(async (resolve, reject) => {
    const command = `sudo cp ${templateVHost} ${newVHost}\n sudo sed -i 's/(domain)/${domain}/g' ${newVHost}\n sudo mv ${newVHost} ${targetNewVHost}\n sudo mkdir ${newFolder}\n sudo chown -R www-data:webftp ${newFolder}\n sudo chmod -R 750 ${newFolder}\n sudo cp ${tempaleIndex} ${newFolder}\n sudo a2ensite ${domain}.conf\n sudo systemctl reload apache2\n sudo systemctl restart apache2\n`;
    const eksekusi = await eksekusiCommand(command, domain);
    resolve(eksekusi);
  });
};
module.exports = createVHost;
