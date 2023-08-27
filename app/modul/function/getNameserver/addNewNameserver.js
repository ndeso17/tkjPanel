const loginSystem = require("../login");
const nameServerChecker = require("./nameServerChecker.js");
const ipAddressChecker = require("./ipAddressChecker.js");
const checkPtrNameserver = require("./ptrNameserverChecker.js");
let resCallBack;
const addNewNameserver = (passwordSudo, nameserver, ipaddress) => {
  return new Promise(async (resolve, reject) => {
    const login = await loginSystem(passwordSudo);
    const statusLogin = login.statusLogin;
    if (!statusLogin) {
      resCallBack = {
        status: false,
        pesan: "Root gagal dibuka!",
      };
    } else {
      const cekNameserver = await nameServerChecker(nameserver);
      const statusCheckerNameserver = cekNameserver.status;
      const existNameserver = cekNameserver.data;
      const cekIpAddress = await ipAddressChecker(ipaddress);
      const akhirIPAddress = cekIpAddress.akhirIPAddressv4;
      const inAddrArpa = cekIpAddress.ipInAddrArpa;
      const cekPtr = await checkPtrNameserver(ipaddress);
      const statusCekPtr = cekPtr.status;
      const existPtr = cekPtr.data;
      if (statusCheckerNameserver) {
        resCallBack = {
          status: false,
          pesan: "Kamu tidak dapat membuat nameserver yang sama berulangkali!",
          existNameserver,
        };
      } else if (statusCheckerNameserver == "die") {
        resCallBack = {
          status: false,
          pesan: "Terjadi masalah ketika mengidentifikasi nameserver!",
        };
      } else {
        if (statusCekPtr) {
          const addNewNameserverNPtr = require("./addNewNameserverNPtr.js");
          const dataAddNewNameserverNPtr = {
            nameserver,
            ipaddress,
            akhirIPAddress,
            existPtr,
          };
          const tambahNewNameserver = await addNewNameserverNPtr(
            dataAddNewNameserverNPtr
          );
          const statusTambahNewNameserver = tambahNewNameserver.status;
          const pesanTambahNewNameserver = tambahNewNameserver.pesan;
          if (!statusTambahNewNameserver) {
            resCallBack = {
              status: false,
              pesan: pesanTambahNewNameserver,
            };
          } else {
            resCallBack = {
              status: true,
              pesan: pesanTambahNewNameserver,
            };
          }
        } else if (statusCekPtr == "die") {
          resCallBack = {
            status: false,
            pesan:
              "Terjadi masalah ketika mengidentifikasi PTR untuk nameserver.",
          };
        } else {
          const addNewNameserverWPtr = require("./addNewNameserverWPtr.js");
          const dataNewNameserverWPtr = {
            nameserver,
            ipaddress,
            akhirIPAddress,
            inAddrArpa,
          };
          const addNameserverWPtr = await addNewNameserverWPtr(
            dataNewNameserverWPtr
          );
          const statusAddNameserverWPtr = addNameserverWPtr.status;
          const pesanAddNameserverWPtr = addNameserverWPtr.pesan;
          if (!statusAddNameserverWPtr) {
            resCallBack = {
              status: false,
              pesan: pesanAddNameserverWPtr,
            };
          } else {
            resCallBack = {
              status: true,
              pesan: pesanAddNameserverWPtr,
            };
          }
        }
      }
    }
    resolve(resCallBack);
  });
};
module.exports = addNewNameserver;
