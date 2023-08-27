require("dotenv").config();
const port = process.env.APP_PORT;
const urlTkjPanelUI = process.env.UI_LINK;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.12.1:8000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const middlewareAPi = require("./app/routes/loginAPi");
// Router
//* Database Start
const dtbsConn = require("./app/routes/cekKoneksiDtbs");
app.use("/dtbsConn", dtbsConn);
//! Database End
//* Register Start
const register = require("./app/routes/register");
app.use("/register", register);
//! Register End
//* FTP Client Start
const ftpClient = require("./app/routes/apiMenu/listFtpClient");
app.use("/ftpClient", middlewareAPi, ftpClient);
const createFtpClient = require("./app/routes/apiMenu/createFtpUser");
app.use("/createFtpClient", createFtpClient);
const deleteFtpClient = require("./app/routes/apiMenu/deleteFtpClient.js");
app.use("/deleteFtpClient", deleteFtpClient);
//! FTP Client End
//* Domain Start
const createNewDomain = require("./app/routes/apiMenu/createDomain");
app.use("/createNewDomain", createNewDomain);
const getDomain = require("./app/routes/getDomain");
app.use("/getDomain", getDomain);
const deleteDomain = require("./app/routes/deleteDomain");
app.use("/deleteDomain", deleteDomain);
const addRecordDomain = require("./app/routes/addRecordDomain");
app.use("/addRecordDomain", addRecordDomain);
const getAllDomainConf = require("./app/routes/apiMenu/getAllDomainConf");
app.use("/getAllDomain", getAllDomainConf);
const getAllNameserver = require("./app/routes/apiMenu/getAllNameserver");
app.use("/getAllNameserver", getAllNameserver);
const deleteAllDataDomain = require("./app/routes/apiMenu/deleteAllDataDomain");
app.use("/deleteAllDataDomain", deleteAllDataDomain);
const getDataDomain = require("./app/routes/apiMenu/getDataDomain");
app.use("/getDataDomain", getDataDomain);
//! Domain End
//* Nameserver Start
const getNameserverConfig = require("./app/routes/apiMenu/getNameserverConfig.js");
app.use("/getNameserverConfig", getNameserverConfig);
const addNewNameserver = require("./app/routes/apiMenu/addNewNameserver.js");
app.use("/addNewNameserver", addNewNameserver);
//! Nameserver End
//* SSL Start
const cekSSL = require("./app/routes/apiMenu/cekSSL");
app.use("/cekSSL", cekSSL);
//! SSL End
//* Install App Start
const installWordpress = require("./app/routes/apiMenu/installWordpress");
app.use("/installWordpress", installWordpress);
//! Install App End
//* Mysql Start
// const getAllDatabase = require("./app/routes/apiMenu/getAllDatabase");
// app.use("/getAllDatabase", getAllDatabase);
const createMysqlUser = require("./app/routes/apiMenu/createUserMysql");
app.use("/createUserMysql", createMysqlUser);
const getTabelDatabase = require("./app/routes/apiMenu/getTabelDatabase");
app.use("/getTabelDatabase", getTabelDatabase);
const createNewDatabase = require("./app/routes/apiMenu/createNewDatabase.js");
app.use("/createNewDatabase", createNewDatabase);
//! Mysql End
//Router & Menu Testing
const cobaGetIPNS = require("./app/routes/cobaGetIPNS");
app.use("/getIpNs", cobaGetIPNS);

//? File Manager
const getAllFile = require("./app/routes/apiMenu/getAllFile.js");
app.use("/getAllFile", getAllFile);
const getFolderDomain = require("./app/routes/apiMenu/getFolderDomain");
app.use("/getFolderDomain", getFolderDomain);
const renameFifo = require("./app/routes/apiMenu/renamefifo.js");
app.use("/renameFiFo", renameFifo);
const editFile = require("./app/routes/apiMenu/editFile.js");
app.use("/editFile", editFile);
const deleteFiFo = require("./app/routes/apiMenu/deleteFiFo.js");
app.use("/deleteFiFo", deleteFiFo);
const upNewFile = require("./app/routes/apiMenu/upNewFile.js");
app.use("/upNewFile", upNewFile);
const createNewFolder = require("./app/routes/apiMenu/createNewFolder.js");
app.use("/createNewFolder", createNewFolder);
const createNewFile = require("./app/routes/apiMenu/createNewFile.js");
app.use("/createNewFile", createNewFile);
//Run port app setting
app.listen(port, () => {
  console.log(`APi Berjalan Pada Port ${port}`);
});
