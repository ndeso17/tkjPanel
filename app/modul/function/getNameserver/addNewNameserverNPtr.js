const eksekusiNPtr = require("./eksekusiWPtr");
const path = require("path");
const addNewNameserverNPtr = (data) => {
  const templateRecord = path.join(
    __dirname,
    `../../../../support/bind9/db.ptrNameserver`
  );
  const newRecord = path.join(
    __dirname,
    `../../../../support/bind9/db.${data.nameserver}`
  );
  const targetNamedConf = "/etc/bind/named.conf";
  const targetMoveRecord = "/etc/bind/tPanel";
  const existPtr = `/etc/bind/tPanel/${data.existPtr}`;
  const record = {
    ns1Record: `@\t14400\tIN\tNS\t${data.nameserver}.`,
    ns1IpRecord: `@\t14400\tIN\tA\t${data.ipaddress}`,
    ptrDomainRecord: `${data.akhirIPAddress}\t14400\tIN\tPTR\t${data.nameserver}.`,
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const version = "01";
  const noSerialDomain = `${year}${month}${day}${version}`;
  //Zone Conf
  const copyTemplateZone = `sudo cp ${templateRecord} ${newRecord}`;
  const replaceNoSerialZone = `sudo sed -i "s|(noSerialDomain)|${noSerialDomain}|g" "${newRecord}"`;
  const replaceNsZone = `sudo sed -i "s|(nameserver)|${data.nameserver}|g" "${newRecord}"`;
  const replaceNsRecordZone = `echo '${record.ns1Record}' | sudo tee -a ${newRecord}`;
  const replaceIpRecordZone = `echo '${record.ns1IpRecord}' | sudo tee -a ${newRecord}`;
  const moveTemplateZone = `sudo mv ${newRecord} ${targetMoveRecord}`;
  //PTR Conf
  const replacePtrRecordZone = `echo '${record.ptrDomainRecord}' | sudo tee -a ${existPtr}`;
  //Named conf
  const namedZone = `echo 'zone "${data.nameserver}" { type master; file "/etc/bind/tPanel/db.${data.nameserver}"; };' | sudo tee -a ${targetNamedConf}`;
  //Reload bind9 & restart
  const reloadBind = `sudo systemctl reload bind9`;
  const restartBind = `sudo systemctl restart bind9`;

  const nameserver = data.nameserver;
  return new Promise(async (resolve, reject) => {
    const command = `${copyTemplateZone} && ${replaceNoSerialZone} && ${replaceNsZone} && ${replaceNsRecordZone} && ${replaceIpRecordZone} && ${moveTemplateZone} && ${replacePtrRecordZone} && ${namedZone} && ${reloadBind} && ${restartBind}`;
    const eksekusiNewNameserver = await eksekusiNPtr(command, nameserver);
    resolve(eksekusiNewNameserver);
  });
};
module.exports = addNewNameserverNPtr;
