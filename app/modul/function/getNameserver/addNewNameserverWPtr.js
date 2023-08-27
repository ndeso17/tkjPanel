const eksekusiWPtr = require("./eksekusiWPtr");
const path = require("path");
const addNameserverWPtr = (data) => {
  const templateZoneDomainPath = path.join(
    __dirname,
    `../../../../support/bind9/db.ptrNameserver`
  );
  const newZoneDomainPath = path.join(
    __dirname,
    `../../../../support/bind9/db.${data.nameserver}`
  );
  const newPTRDomainPath = path.join(
    __dirname,
    `../../../../support/bind9/db.${data.ipaddress}`
  );
  const targetNamedConf = `/etc/bind/named.conf`;
  const targetMoveRecordZone = "/etc/bind/tPanel/";
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

  return new Promise(async (resolve, reject) => {
    //Zone Conf
    const copyTemplateZone = `sudo cp ${templateZoneDomainPath} ${newZoneDomainPath}`;
    const replaceNoSerialZone = `sudo sed -i "s|(noSerialDomain)|${noSerialDomain}|g" "${newZoneDomainPath}"`;
    const replaceNsZone = `sudo sed -i "s|(nameserver)|${data.nameserver}|g" "${newZoneDomainPath}"`;
    const replaceNsRecordZone = `echo '${record.ns1Record}' | sudo tee -a ${newZoneDomainPath}`;
    const replaceIpRecordZone = `echo '${record.ns1IpRecord}' | sudo tee -a ${newZoneDomainPath}`;
    const replacePtrRecordZone = `echo '${record.ptrDomainRecord}' | sudo tee -a ${newZoneDomainPath}`;
    const moveTemplateZone = `sudo mv ${newZoneDomainPath} ${targetMoveRecordZone}`;
    //PTR Conf
    const copyTemplatePTR = `sudo cp ${templateZoneDomainPath} ${newPTRDomainPath}`;
    const replaceNoSerialPTR = `sudo sed -i "s|(noSerialDomain)|${noSerialDomain}|g" "${newPTRDomainPath}"`;
    const replaceNsPTR = `sudo sed -i "s|(nameserver)|${data.nameserver}|g" "${newPTRDomainPath}"`;
    const replaceNsRecordPTR = `echo '${record.ns1Record}' | sudo tee -a ${newPTRDomainPath}`;
    const replacePtrRecordPTR = `echo '${record.ptrDomainRecord}' | sudo tee -a ${newPTRDomainPath}`;
    const moveTemplatePTR = `sudo mv ${newPTRDomainPath} ${targetMoveRecordZone}`;
    //Named conf
    const namedZone = `echo 'zone "${data.nameserver}" { type master; file "/etc/bind/tPanel/db.${data.nameserver}"; };' | sudo tee -a ${targetNamedConf}`;
    const namedPTR = `echo 'zone "${data.inAddrArpa}.in-addr.arpa" { type master; file "/etc/bind/tPanel/db.${data.ipaddress}"; };' | sudo tee -a ${targetNamedConf}`;
    //Reload bind9 & restart
    const reloadBind = `sudo systemctl reload bind9`;
    const restartBind = `sudo systemctl restart bind9`;
    //End
    const nameserver = data.nameserver;
    const command = `${copyTemplateZone} && ${replaceNoSerialZone} && ${replaceNsZone} && ${replaceNsRecordZone} && ${replaceIpRecordZone} && ${replacePtrRecordZone} && ${moveTemplateZone} && ${copyTemplatePTR} && ${replaceNoSerialPTR} && ${replaceNsPTR} && ${replaceNsRecordPTR} && ${replacePtrRecordPTR} && ${moveTemplatePTR} && ${namedZone} && ${namedPTR} && ${reloadBind} && ${restartBind}`;
    const eksekusi = await eksekusiWPtr(command, nameserver);
    resolve(eksekusi);
  });
};
module.exports = addNameserverWPtr;
